import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/services/user.service';
import { AuthenticationService } from 'app/services/authentication.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-delete-account-form',
  templateUrl: './delete-account-form.component.html',
  styleUrls: ['./delete-account-form.component.css']
})
export class DeleteAccountFormComponent implements OnInit {
  private showConfirmDelete = false;
  private feedback = '';
  private password = '';

  private error = false;

  constructor(private _authService: AuthenticationService,
    private _userService: UserService,
    private _router: Router) { }

  ngOnInit() {
  }

  private toggleConfirmDelete(value: boolean) {
    if (value) {
      this.showConfirmDelete = true;
      $('#delete-primary').fadeOut(400, function () {
        $('#delete-confirm-wrapper').css('opacity', 0).removeClass('hidden').slideDown(400).animate(
          { opacity: 1 }, { queue: false, duration: 400 });
      });
    } else {
      $('#delete-confirm-wrapper').slideUp(500).animate({ opacity: 0 }, { queue: false, duration: 400 });

      setTimeout(() => {
        this.showConfirmDelete = false;
        $('#delete-primary').fadeIn(400);
      }, 400);
    }
  }

  private removeUser() {
    const user_json: string = JSON.stringify({
      password: this.password,
      feedback: this.feedback
    });

    this._userService.deleteUserAccount(user_json).subscribe(
      success => {
        this.error = false;
        this._authService.logout();
        this._router.navigate(['/account-deleted']);
      },
      error => {
        this.error = true;
        $('#delete-error-dialog').fadeIn().removeClass('hidden');
      }
    );
  }
}
