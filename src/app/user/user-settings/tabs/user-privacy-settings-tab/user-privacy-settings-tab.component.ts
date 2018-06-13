import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { UserPrivacySettings } from 'app/models/user.settings';
import { faEdit, faEye, faSearch } from '@fortawesome/fontawesome-pro-regular';
import { faBan, faCheck } from '@fortawesome/fontawesome-pro-solid';
import fontawesome from '@fortawesome/fontawesome';
import { UserSearchSettingsFormComponent } from './forms/user-search-settings-form/user-search-settings-form.component';
import { UserViewingSettingsFormComponent } from './forms/user-viewing-settings-form/user-viewing-settings-form.component';

fontawesome.library.add(faBan);
fontawesome.library.add(faCheck);
fontawesome.library.add(faEdit);
fontawesome.library.add(faEye);
fontawesome.library.add(faSearch);


@Component({
  selector: 'app-user-privacy-settings-tab',
  templateUrl: './user-privacy-settings-tab.component.html',
  styleUrls: ['./user-privacy-settings-tab.component.css']
})
export class UserPrivacySettingsTabComponent implements OnInit {
  @Input() settings: UserPrivacySettings;

  @ViewChild(UserSearchSettingsFormComponent) search_form: UserSearchSettingsFormComponent;
  @ViewChild(UserViewingSettingsFormComponent) view_form: UserViewingSettingsFormComponent;

  private editViewing = false;
  private editSearch = false;

  constructor() { }
  ngOnInit() { }

  private toggleEditSearch() {
    this.editSearch = !this.editSearch;
    this.search_form.toggleEditSearch(this.editSearch);

    if (!this.editSearch) { this.search_form.updateSettings(); }
  }

  private toggleEditView() {
    this.editViewing = !this.editViewing;
    this.view_form.toggleEditView(this.editViewing);

    if (!this.editViewing) { this.view_form.updateSettings(); }
  }
}
