import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private showLogin: boolean;
  private isAuthenticated: boolean;

  constructor(private _authenticationService: AuthenticationService) { }
  ngOnInit() { 
    this.isAuthenticated = this._authenticationService.userIsAuthenticated();
    this.showLogin = true;
  }

  private logout() {
    this._authenticationService.logout();
  }
}
