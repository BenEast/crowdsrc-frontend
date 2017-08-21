import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { CookieService } from 'ngx-cookie';

@Injectable()
export class AuthenticationService {
  private authenticationUrl = 'http://localhost:8000/authenticate/'
  private validateTokenUrl = 'http://localhost:8000/validate-token/'

  constructor(private _cookieService: CookieService, private _http: Http) { }

  authenticateUser(login_json: string) {
    return this._http.post(this.authenticationUrl, login_json, { headers: this.getHeaders() });
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
      return this._http.post(this.validateTokenUrl, { "token": token }, { headers: this.getHeaders() });
    }
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