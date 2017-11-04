import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/user';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-update-profile-form',
  templateUrl: './update-profile-form.component.html',
  styleUrls: ['./update-profile-form.component.css']
})
export class UpdateProfileFormComponent implements OnInit {
  @Input() user: string; // Had to do JSON.stringify on user object to send it via input
  @Input() profileId: number;
  @Output() update = new EventEmitter();

  private model;
  private showForm: boolean;

  constructor(private _sharedService: SharedService) { }

  ngOnInit() {
    this.showForm = false;
    this.resetModel();
  }

  private resetModel() {
    if (this.user) {
      this.model = JSON.parse(this.user);
    } else {
      this.model = new User(this.profileId, "", "", "", "", "", "", "", [], "", "", "", "");
    }
  }

  private submitForm() {
    this.update.emit(JSON.stringify(this.model));
    let profile_json = userToProfileJson(this.model);
    this._sharedService.updateProfile(this.profileId, JSON.stringify(profile_json)).subscribe(
      success => {
        this.resetModel();
      },
      error => {
        console.log("Error updating profile");
        console.log(error);
      }
    );
  }
}

function userToProfileJson(user) {
  let userJson = JSON.parse(JSON.stringify(user));

  return {
    "id": userJson.id,
    // Split first name/last name on first space in the string
    "first_name": userJson.name.substr(0, userJson.name.indexOf(' ')),
    "last_name": userJson.name.substr(userJson.name.indexOf(' ') + 1),
    "bio": userJson.bio,
    "location": userJson.location,
    "birth_date": userJson.birth_date,
    "image_name": userJson.image_name,
    "skills": userJson.skills
  };
}