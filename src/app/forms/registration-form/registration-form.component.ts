import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AbstractControl, ValidatorFn, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../models/user';
import { RecaptchaComponent } from 'ng2-recaptcha';
import { faCheckCircle, faTimesCircle } from '@fortawesome/fontawesome-pro-regular';
import fontawesome from '@fortawesome/fontawesome';

fontawesome.library.add(faCheckCircle);
fontawesome.library.add(faTimesCircle);

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {
  @Input() hideTitle = false;

  private model = new User(1, '', false);
  private usernameIsAvailable: boolean;
  private password = '';
  private success = false;

  @ViewChild(RecaptchaComponent) recaptcha: RecaptchaComponent;

  constructor(private _authService: AuthenticationService) { }
  ngOnInit() { }

  private checkUsername() {
    if (!this.model.username) {
      this.usernameIsAvailable = undefined;
      return;
    }

    this._authService.isUsernameAvailable(this.model.username).subscribe(
      result => this.usernameIsAvailable = result);
  }

  private submitUser(recaptcha_response: string) {
    const registration_json = JSON.stringify({
      username: this.model.username,
      email: this.model.email,
      password: this.password,
      recaptcha_response: recaptcha_response,
    });

    this._authService.registerUser(registration_json).subscribe(
      success => this.success = true,
      error => this.success = false);

    this.recaptcha.reset();
  }
}
