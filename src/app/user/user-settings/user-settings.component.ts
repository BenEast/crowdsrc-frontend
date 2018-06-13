import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { AuthenticationService } from 'app/services/authentication.service';
import { UserSettings } from 'app/models/user.settings';
import { UserService } from 'app/services/user.service';
import { faSlidersH } from '@fortawesome/fontawesome-pro-light';
import { faUserCircle, faUserSecret } from '@fortawesome/fontawesome-pro-solid';
import fontawesome from '@fortawesome/fontawesome';

fontawesome.library.add(faSlidersH);
fontawesome.library.add(faUserCircle);
fontawesome.library.add(faUserSecret);

declare var $: any;

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {
  settings: UserSettings;
  private currentTab: string;
  private tab_map: Map<string, string> = new Map<string, string>();

  constructor(private _authService: AuthenticationService,
    private _activatedRoute: ActivatedRoute,
    private _userService: UserService) { }

  ngOnInit() {
    // Set up tab_map for handling tab change effects
    this.tab_map.set('account', '#account-settings-tab');
    this.tab_map.set('preferences', '#preferences-tab');
    this.tab_map.set('privacy', '#privacy-settings-tab');

    this._activatedRoute.queryParams.subscribe(
      params => {
        let tab_param = params['tab'];
        if (tab_param) { tab_param = tab_param.toLowerCase(); }
        const tab_value = Array.from(this.tab_map.keys()).includes(tab_param) ? tab_param : 'preferences';
        this.currentTab = tab_value;
      }
    );

    // Get current user first, to ensure that user headers will be sent correctly
    this._authService.getCurrentUser().subscribe(user => {
      if (!this.settings) { this.getUserSettings(); }
    });
  }

  private getUserSettings() {
    this._userService.getUserSettings().subscribe(settings => this.settings = settings);
  }
}
