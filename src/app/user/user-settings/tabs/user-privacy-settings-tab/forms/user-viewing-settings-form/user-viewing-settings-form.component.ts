import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'app/services/user.service';
import { UserPrivacySettings } from 'app/models/user.settings';

@Component({
  selector: 'app-user-viewing-settings-form',
  templateUrl: './user-viewing-settings-form.component.html',
  styleUrls: ['./user-viewing-settings-form.component.css']
})
export class UserViewingSettingsFormComponent implements OnInit {
  @Input() settings: UserPrivacySettings;

  private editViewing = false;
  private levels: string[] = ['public', 'crowd', 'me'];
  private levelNames: string[] = ['Everyone', 'My crowd', 'Only me'];

  constructor(private _userService: UserService) { }

  ngOnInit() { }

  // Handles an issue with double events; we were
  // receiving a string and an object on each change
  onChange(event) {
    if (event instanceof Object) {
      return event.target.value;
    } else {
      return event;
    }
  }

  toggleEditView(value: boolean) {
    this.editViewing = value;
  }

  updateSettings() {
    const settings_json = JSON.stringify({
      view_age_level: this.settings.view_age_level,
      view_email_level: this.settings.view_email_level,
      view_activity_level: this.settings.view_activity_level,
      view_crowd_level: this.settings.view_crowd_level,
      view_stats_level: this.settings.view_stats_level,
    });

    this._userService.updatePrivacySettings(settings_json, 'view').subscribe(success => { });
  }
}
