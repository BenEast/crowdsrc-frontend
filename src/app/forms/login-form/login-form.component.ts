import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['../forms.css']
})
export class LoginFormComponent implements OnInit {
  private model = new User(1, "", "", "", "", "", "", "", [], "", "", "", "");
  @Input() hideTitle: boolean = false;

  constructor(private _authService: AuthenticationService, private _router: Router) { }
  ngOnInit() { }

  private submitCredentials() {
    let login_json = JSON.stringify(this.model);
    this._authService.submitCredentials(login_json);
    setTimeout(() => {
      if (this._authService.userIsAuthenticated()) {
        if (this._router.url == '/login') {
          // Redirect to home page
          window.location.reload();
          this._router.navigateByUrl('/');
        } else {
          window.location.reload();
        }
      } else {
        // raise login failure dialog
      }
    }, 300);
  }
}
