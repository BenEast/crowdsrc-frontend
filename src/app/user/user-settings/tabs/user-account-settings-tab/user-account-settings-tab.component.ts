import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from 'app/services/authentication.service';
import { User } from 'app/models/user';
import { ChangePasswordFormComponent } from './forms/change-password-form/change-password-form.component';
import { ChangeEmailFormComponent } from './forms/change-email-form/change-email-form.component';
import { faKey, faAt, faTrashAlt } from '@fortawesome/fontawesome-pro-regular';
import fontawesome from '@fortawesome/fontawesome';

fontawesome.library.add(faAt);
fontawesome.library.add(faKey);
fontawesome.library.add(faTrashAlt);

@Component({
  selector: 'app-user-account-settings-tab',
  templateUrl: './user-account-settings-tab.component.html',
  styleUrls: ['./user-account-settings-tab.component.css']
})
export class UserAccountSettingsTabComponent implements OnInit {
  private currentUser: User;

  @ViewChild(ChangeEmailFormComponent) email_form: ChangeEmailFormComponent;
  @ViewChild(ChangePasswordFormComponent) password_form: ChangePasswordFormComponent;

  constructor(private _authService: AuthenticationService) { }
  ngOnInit() {
    this._authService.getCurrentUser().subscribe(user => this.currentUser = user);
  }
}
