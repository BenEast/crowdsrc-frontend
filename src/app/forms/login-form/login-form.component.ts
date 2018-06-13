import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  @Input() hideTitle = false;

  private error = false;
  private remember = false;

  private username = '';
  private password = '';

  constructor(private _authService: AuthenticationService, private _router: Router) { }
  ngOnInit() { }

  private onKeyDown(event: any) {
    if (event.keyCode === 13) { this.submitCredentials(); }
  }

  private submitCredentials() {
    if (!this.username || !this.password) {
      this.error = true;
      return;
    }

    const login_json = JSON.stringify({
      username: this.username,
      password: this.password,
    });

    this._authService.submitCredentials(login_json, this.remember).subscribe(
      success => {
        this.error = false;
        if (this._router.url === '/login') { this._router.navigate(['/']); }
      },
      error => {
        this.error = true;
        $('#login-error-text').fadeIn(250).removeClass('hidden');
      }
    );
  }
}
