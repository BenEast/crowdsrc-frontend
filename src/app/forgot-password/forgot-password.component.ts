import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { RecaptchaComponent } from 'ng2-recaptcha';
import { User } from 'app/models/user';

declare var $: any;

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  @ViewChild(RecaptchaComponent) recaptcha: RecaptchaComponent;

  private currentUser: User;
  private email = '';
  private username = '';
  private error = false;
  private submitted = false;

  constructor(private _authService: AuthenticationService) { }
  ngOnInit() {
    this._authService.getCurrentUser().subscribe(user => this.currentUser = user);
  }

  private submit(recaptcha_response: string) {
    if (!this.email && !this.username) {
      this.error = true;
      $('#forgot-error-text').fadeIn(250).removeClass('hidden');
      this.recaptcha.reset();
      return;
    }

    const reset_json = JSON.stringify({
      email: this.email,
      username: this.username,
      recaptcha_response: recaptcha_response
    });

    this._authService.requestPasswordReset(reset_json).subscribe(success => { });
    this.error = false;
    this.submitted = true;
    this.email = '';
    this.username = '';
  }
}
