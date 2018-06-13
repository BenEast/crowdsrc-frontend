import { Component, OnInit, Input } from '@angular/core';
import { UserPreferences } from 'app/models/user.settings';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-user-preferences-form',
  templateUrl: './user-preferences-form.component.html',
  styleUrls: ['./user-preferences-form.component.css']
})
export class UserPreferencesFormComponent implements OnInit {
  @Input() preferences: UserPreferences;
  @Input() editPreferences: boolean;

  constructor(private _userService: UserService) { }
  ngOnInit() { }

  private submitPreferences() {
    const preferences_json = JSON.stringify({
      skill_preferences: this.preferences.skill_preferences
    });

    this._userService.updatePreferencesSettings(preferences_json, 'preferences').subscribe(success => { });
  }
}
