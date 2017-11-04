import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { CookieService } from 'ngx-cookie';
import { ConstantService } from './constant.service';
import { User } from '../models/user';

@Injectable()
export class AuthenticationService {
  
  constructor(private _constantService: ConstantService, private _cookieService: CookieService, private _http: Http) { }

  authenticateUser(login_json: string) {
    return this._http.post(this._constantService.getAuthenticationUrl(), login_json, { headers: this.getHeaders() });
  }

  submitCredentials(login_json: string) {
    this.authenticateUser(login_json).subscribe(
      response => {
        this.generateCookie(extractToken(response));
      },
      error => {
        console.log("Error with user authentication");
        console.log("Error: " + error);
      }
    );
  }

  userIsAuthenticated(): boolean {
    if (this._cookieService.get('crowdsrc')) {
      return true;
    } else {
      return false;
    }
  }

  getCurrentUserId() {
    let token = this._cookieService.get('crowdsrc');
    if (token) {
      return this._http.post(this._constantService.getValidationUrl(), { "token": token }, { headers: this.getHeaders() });
    }
  }

  logout() {
    this._cookieService.remove('crowdsrc');
    window.location.reload();
  }

  // Function to generate common headers
  private getHeaders() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return headers;
  }
  private generateCookie(token) {
    this._cookieService.put('crowdsrc', token);
  }
}

function extractToken(response) {
  return response.json().token;
}