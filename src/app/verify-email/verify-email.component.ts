import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {
  private error = false;
  private resend_success = false;
  private uid: string;
  private token: string;

  constructor(private _authService: AuthenticationService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this._activatedRoute.queryParams.subscribe(params => {
      this.uid = params['uid'];
      this.token = params['token'];
      this.verifyData()
    });
  }

  private resendVerification() {
    this.error = false;
    this._authService.resendVerification(this.uid).subscribe(
      success => this.resend_success = true);
  }

  private verifyData() {
    this._authService.verifyEmail(this.uid, this.token).subscribe(
      username => this._router.navigate(['/crowd/' + username]),
      error => this.error = true);
  }
}
