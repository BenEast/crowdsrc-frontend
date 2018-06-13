import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from 'app/services/authentication.service';
import { UserService } from 'app/services/user.service';
import { Skill } from 'app/models/skill';
import { User } from 'app/models/user';
import { faCheck, faTimes } from '@fortawesome/fontawesome-pro-solid';
import { faEdit, faIdCard, faCogs, faUniversity } from '@fortawesome/fontawesome-pro-regular';
import fontawesome from '@fortawesome/fontawesome';

fontawesome.library.add(faCheck);
fontawesome.library.add(faTimes);
fontawesome.library.add(faEdit);
fontawesome.library.add(faCogs);
fontawesome.library.add(faUniversity);

@Component({
  selector: 'app-user-detail-tab',
  templateUrl: './user-detail-tab.component.html',
  styleUrls: ['./user-detail-tab.component.css']
})
export class UserDetailTabComponent implements OnInit {
  @Input() user: User;

  private currentUser: User;
  private user_age: number;

  private aboutModel: User = new User(-1, '', false);
  private aboutEditMode = false;
  private skillEditMode = false;
  private aboutEditError = false;

  constructor(private _authService: AuthenticationService,
    private _userService: UserService) { }

  ngOnInit() {
    this._authService.getCurrentUser().subscribe(user => this.currentUser = user);

    if (this.user.birth_date) { this.user_age = findAge(new Date(this.user.birth_date)); }
    this.resetAboutModel();
  }

  private addSkill(event) {
    const skills = this.user.skills;
    skills.push(event);
    this.user.skills = sortSkillList(skills);
  }

  private submitAboutForm() {
    if (modelWasChanged(this.aboutModel, this.user)) {
      const user_json = JSON.stringify({
        first_name: this.aboutModel.first_name,
        last_name: this.aboutModel.last_name,
        profile: {
          bio: this.aboutModel.bio,
          location: this.aboutModel.location,
          birth_date: this.aboutModel.birth_date,
        },
      });
      this._userService.updateUser(this.user.username, user_json).subscribe(
        updated_user => {
          this.assignUpdatedUser(updated_user);
          this.user_age = findAge(new Date(this.user.birth_date));
          this.resetAboutModel();
          this.aboutEditMode = false;
          this.aboutEditError = false;
        },
        error => this.aboutEditError = true
      );
    } else { this.aboutEditMode = false; }
  }

  private assignUpdatedUser(updated: User) {
    this.user.bio = updated.bio;
    this.user.birth_date = updated.birth_date;
    this.user.email = updated.email;
    this.user.first_name = updated.first_name;
    this.user.last_name = updated.last_name;
    this.user.location = updated.location;
  }

  private resetAboutModel() {
    Object.assign(this.aboutModel, this.user);
  }

  private removeSkill(index: number) {
    if (this.currentUser.id === this.user.id) { this.user.skills.splice(index, 1); }
  }
}

function modelWasChanged(model: User, original: User) {
  if (model.first_name !== original.first_name || model.last_name !== original.last_name ||
    model.email !== original.email || model.location !== original.location ||
    model.birth_date !== original.birth_date || model.bio !== original.bio) { return true; }
  return false;
}

function findAge(birthday: Date) {
  const diff = Math.abs(Date.now() - birthday.getTime());
  return Math.floor((diff / (1000 * 3600 * 24)) / 365);
}

function sortSkillList(list: Skill[]) {
  return list.sort((s1, s2): number => {
    if (s1.name < s2.name) { return -1; }
    if (s1.name > s2.name) { return 1; }
    return 0;
  });
}
