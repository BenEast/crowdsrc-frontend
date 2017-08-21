import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication.service';
import { Router } from '@angular/router';
import { User } from '../../user/user';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  model = new User(1, "", "", "", "", "", "");

  constructor(private _authService: AuthenticationService, private _router: Router) { }
  ngOnInit() { }

  private submitCredentials() {
    let login_json = JSON.stringify(this.model);
    this._authService.submitCredentials(login_json);

    if (this._authService.userIsAuthenticated()) {
      window.location.reload();
    } else {
      // raise login failure dialog
    }
  }

}
