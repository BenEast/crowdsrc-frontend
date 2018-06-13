import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { UserPreferences } from 'app/models/user.settings';
import { faListOl, faComment, faEdit } from '@fortawesome/fontawesome-pro-regular';
import { faCheck, faExclamation } from '@fortawesome/fontawesome-pro-solid';
import fontawesome from '@fortawesome/fontawesome';
import { UserPreferencesFormComponent } from './forms/user-preferences-form/user-preferences-form.component';
import { UserNotificationsFormComponent } from './forms/user-notifications-form/user-notifications-form.component';

fontawesome.library.add(faListOl);
fontawesome.library.add(faComment);
fontawesome.library.add(faEdit);
fontawesome.library.add(faCheck);
fontawesome.library.add(faExclamation);

@Component({
  selector: 'app-user-preferences-tab',
  templateUrl: './user-preferences-tab.component.html',
  styleUrls: ['./user-preferences-tab.component.css']
})
export class UserPreferencesTabComponent implements OnInit {
  @Input() preferences: UserPreferences;

  @ViewChild(UserPreferencesFormComponent) preferences_form: UserPreferencesFormComponent;
  @ViewChild(UserNotificationsFormComponent) notifications_form: UserNotificationsFormComponent;

  editNotifications = false;
  editPreferences = false;

  constructor() { }
  ngOnInit() { }
}
