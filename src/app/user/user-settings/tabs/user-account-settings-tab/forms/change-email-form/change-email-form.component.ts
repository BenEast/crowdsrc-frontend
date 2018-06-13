import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from 'app/services/authentication.service';

declare var $: any;

@Component({
  selector: 'app-change-email-form',
  templateUrl: './change-email-form.component.html',
  styleUrls: ['./change-email-form.component.css']
})
export class ChangeEmailFormComponent implements OnInit {
  private email = '';
  editEmail = true;
  private confirmEmailPassword = '';

  private success = false;
  private error = false;

  constructor(private _authService: AuthenticationService) { }
  ngOnInit() { }

  private toggleEditEmail(value = !this.editEmail) {
    if (value) {
      this.email = '';
      this.confirmEmailPassword = '';
      this.editEmail = true;
      $('#update-email-form').css('opacity', 0).slideDown().animate(
        { opacity: 1 }, { queue: false, duration: 400 });
    } else {
      const that = this;
      $('#update-email-form').slideUp(400, function () {
        that.email = '';
        that.confirmEmailPassword = '';
        that.editEmail = false;
      }).animate({ opacity: 0 }, { queue: false, duration: 400 });
    }
  }

  private updateEmail() {
    const email_json: string = JSON.stringify({
      current_password: this.confirmEmailPassword,
      email: this.email
    });

    this._authService.changeEmail(email_json).subscribe(
      success => {
        this.success = true;

        if (this.error) {
          const that = this;
          $('#email-error-dialog').fadeOut(200, function () {
            that.error = false;
            $('#email-success-dialog').fadeIn(200).removeClass('hidden');
          });
        } else {
          // Set timeout to allow Angular to load from ngIf
          setTimeout(() => $('#email-success-dialog').fadeIn().removeClass('hidden'), 50);
        }
      },
      error => {
        this.error = true;

        if (this.success) {
          const that = this;
          $('#email-success-dialog').fadeOut(200, function () {
            that.success = false;
            $('#email-error-dialog').fadeIn(200).removeClass('hidden');
          });
        } else {
          // Set timeout to allow Angular to load from ngIf
          setTimeout(() => $('#email-error-dialog').fadeIn().removeClass('hidden'), 50);
        }
      });
  }
}
