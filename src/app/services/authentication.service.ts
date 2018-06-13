import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { ConstantService } from './constant.service';
import { MapService } from 'app/services/map.service';
import { User } from 'app/models/user';

@Injectable()
export class AuthenticationService {
  private current_user: ReplaySubject<User> = new ReplaySubject<User>(1);
  private init_complete: ReplaySubject<Boolean> = new ReplaySubject<Boolean>(1);

  private token_name = 'crowdsrc_auth';
  private refresh_name = 'crowdsrc_ref';

  private token_expire: Date;
  private refresh_expire: Date;
  private remember_user = false;

  constructor(private _constantService: ConstantService,
    private _mapService: MapService,
    private _http: Http) { }

  init() {
    window.addEventListener('beforeunload', function (e) {
      this.sessionStorage.removeItem('crowdsrc_auth');
    });

    if (localStorage.getItem(this.refresh_name)) {
      this.remember_user = true;
    }
    this.refreshToken();
    this.init_complete.next(true);
  }

  initComplete(): ReplaySubject<Boolean> {
    return this.init_complete;
  }

  changePassword(password_json: string): Observable<Response> {
    return this._http.post(this._constantService.getBaseUrl() + '/change-password/', password_json, this.getHeaders());
  }

  requestPasswordReset(reset_json: string): Observable<Response> {
    return this._http.post(this._constantService.getBaseUrl() + '/reset-password/', reset_json, this.getHeaders());
  }

  resetPassword(uid: string, reset_json: string): Observable<Response> {
    return this._http.post(this._constantService.getBaseUrl() + '/reset-password/' + uid + '/', reset_json, this.getHeaders());
  }

  changeEmail(email_json: string): Observable<Response> {
    return this._http.post(this._constantService.getBaseUrl() + '/change-email/', email_json, this.getHeaders());
  }

  resendVerification(uid: string): Observable<Response> {
    return this._http.post(this._constantService.getBaseUrl() + '/verify/' + uid + '/', undefined, this.getHeaders());
  }

  verifyEmail(uid: string, token: string): Observable<string> {
    return new Observable((observer) => {
      this._http.post(this._constantService.getBaseUrl() + '/verify/' + uid + '/' + token + '/',
        undefined, this.getHeaders()).subscribe(
          success => {
            const result = success.json();
            this.updateData(result);
            observer.next(result.user.username);
            observer.complete();
          },
          error => {
            observer.error(error);
            observer.complete();
          }
        );
    });
  }

  isUsernameAvailable(username: string): Observable<boolean> {
    return this._http.get(this._constantService.getBaseUrl() + '/check/' + username + '/',
      this.getHeaders()).map(function (e) { return e.json(); });
  }

  registerUser(user_json: string): Observable<Response> {
    return this._http.post(this._constantService.getBaseUrl() + '/register/', user_json, this.getHeaders());
  }

  submitCredentials(login_json: string, remember?: boolean): Observable<string> {
    this.remember_user = remember ? false : true;

    return new Observable((observer) => {
      this._http.post(this._constantService.getAuthenticationUrl(), login_json,
        this.getHeaders()).subscribe(
          response => {
            this.updateData(response.json());
            observer.next('User successfully authenticated');
            observer.complete();
          },
          error => {
            observer.error('Incorrect username or password.');
            observer.complete();
          });
    });
  }

  getCurrentUser(): ReplaySubject<User> {
    return this.current_user;
  }

  getCurrentAuthToken(): string {
    return sessionStorage.getItem(this.token_name)
  }

  private getCurrentRefreshToken(): string {
    if (this.remember_user) {
      return localStorage.getItem(this.refresh_name);
    } else {
      return sessionStorage.getItem(this.refresh_name);
    }
  }

  logout() {
    sessionStorage.removeItem(this.token_name);
    localStorage.removeItem(this.refresh_name);
    sessionStorage.removeItem(this.refresh_name);
    this.current_user.next(undefined);
  }

  private refreshToken(retry: boolean = false) {
    const refresh_token = this.getCurrentRefreshToken();
    if (!refresh_token) {
      this.current_user.next(undefined);
      return;
    }

    const now = new Date();
    // If token expires in more than 30 seconds, try again at the right time
    if (this.token_expire && (this.token_expire.getTime() - now.getTime()) > 30000) {
      setTimeout(_ => this.refreshToken(), (this.token_expire.getTime() - now.getTime()) - 30001);
      return;
    }

    this._http.post(this._constantService.getRefreshUrl(), { 'refresh_token': refresh_token }, this.getHeaders()).subscribe(
      success => this.updateData(success.json()),
      error => {
        // If refresh failed and this isn't a retry, try again in 1 second
        if (!retry) {
          setTimeout(_ => this.refreshToken(true), 1000);
        } else { this.current_user.next(undefined); }

      }
    );
  }

  // Function to generate common headers
  getHeaders() {
    const headers = new Headers();
    const auth_token = this.getCurrentAuthToken();

    if (auth_token) { headers.append('Authorization', 'Token ' + auth_token); }

    headers.append('Content-Type', 'application/json');
    return { headers: headers };
  }

  private updateData(response) {
    this.token_expire = new Date(response.expires);
    this.refresh_expire = new Date(response.refresh_expire);

    // Always keep auth token in session storage
    sessionStorage.setItem(this.token_name, response.key);
    // Checkif remember refresh token; the server enforces an expiration date
    if (this.remember_user) {
      localStorage.setItem(this.refresh_name, response.refresh_token);
    } else { sessionStorage.setItem(this.refresh_name, response.refresh_token); }

    // Schedule next refresh for the token
    const now = new Date();
    setTimeout(_ => this.refreshToken(), (this.token_expire.getTime() - now.getTime()) - 30000);

    const mapUser = this._mapService.mapUser;

    const user = mapUser(response.user);
    user.crowd_requests = response.crowd_requests;
    user.notification_count = response.notification_count;

    this.current_user.next(user);
  }
}
