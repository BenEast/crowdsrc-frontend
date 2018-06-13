import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'app/services/authentication.service';
import { Router } from '@angular/router';
import { RouteService } from 'app/services/route.service';

declare var $: any;

@Component({
  selector: 'app-change-password-form',
  templateUrl: './change-password-form.component.html',
  styleUrls: ['./change-password-form.component.css']
})
export class ChangePasswordFormComponent implements OnInit {
  private password = '';
  private currentPassword = '';
  private editPassword = true;
  private error = false;

  constructor(private _authService: AuthenticationService,
    private _router: Router,
    private _routeService: RouteService) { }

  ngOnInit() { }

  toggleEditPassword(value = !this.editPassword) {
    if (value) {
      this.editPassword = true;

      // Set timeout so Angular can load the content from *ngIf
      setTimeout(() => {
        $('#change-password').css('opacity', 0).removeClass('hidden').slideDown(400).animate(
          { opacity: 1 }, { queue: false, duration: 400 });
      }, 10);
    } else {
      const that = this;
      $('#change-password').slideUp(400, function () {
        that.editPassword = false;
      }).animate({ opacity: 0 }, { queue: false, duration: 400 });
    }
  }

  private updatePassword() {
    const password_json: string = JSON.stringify({
      current_password: this.currentPassword,
      new_password: this.password,
    });

    this._authService.changePassword(password_json).subscribe(
      success => {
        this.error = false;

        // Add route param for login page to recognize
        this._routeService.addQueryParam('updated-password', true)
        this._authService.logout();
        this._router.navigate(['/login']);
      },
      error => {
        this.error = true;
        // Set timeout to allow Angular to load from ngIf
        setTimeout(() => $('#password-error-dialog').fadeIn().removeClass('hidden'), 50);
      }
    );
  }
}
