import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { RecaptchaComponent } from 'ng2-recaptcha';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  @ViewChild(RecaptchaComponent) recaptcha: RecaptchaComponent;

  private loading = true;
  private failure = false;
  private success = false;

  private uid: string;
  private token: string;
  private password = '';

  constructor(private _authService: AuthenticationService,
    private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this._activatedRoute.queryParams.subscribe(
      params => {
        this.uid = params['uid'];
        this.token = params['token'];
        this.loading = false;
      }
    );
  }

  private onKeyDown(event: any) {
    if (event.keyCode === 13) { this.recaptcha.execute(); }
  }

  private resetPassword(recaptcha_response: string) {
    this.loading = true;

    const reset_json = JSON.stringify({
      token: this.token,
      password: this.password,
      recaptcha_response: recaptcha_response,
    });

    this._authService.resetPassword(this.uid, reset_json).subscribe(
      success => {
        this.loading = false;
        this.failure = false;
        this.success = true;
      },
      error => {
        this.loading = false;
        this.success = false;
        this.failure = true;
      }
    );
    this.recaptcha.reset();
  }
}
