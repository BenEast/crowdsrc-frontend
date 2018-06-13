import { Component, OnInit, Input } from '@angular/core';
import { UserPrivacySettings } from 'app/models/user.settings';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-user-search-settings-form',
  templateUrl: './user-search-settings-form.component.html',
  styleUrls: ['./user-search-settings-form.component.css']
})
export class UserSearchSettingsFormComponent implements OnInit {
  @Input() settings: UserPrivacySettings;

  private editSearch = false;
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

  toggleEditSearch(value: boolean) {
    this.editSearch = value;
    // add jquery transitions
  }

  updateSettings() {
    const settings_json = JSON.stringify({
      allow_name_search: this.settings.allow_name_search,
      allow_loc_search: this.settings.allow_loc_search,
      allow_email_search: this.settings.allow_email_search,
      allow_username_search: this.settings.allow_username_search,
    });

    this._userService.updatePrivacySettings(settings_json, 'search').subscribe(success => { });
  }
}
