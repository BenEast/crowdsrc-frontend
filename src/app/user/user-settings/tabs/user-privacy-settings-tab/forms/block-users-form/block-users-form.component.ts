import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'app/services/user.service';
import { BlockedUser } from 'app/models/user.settings';
import { faTimes } from '@fortawesome/fontawesome-pro-solid';
import { faUserTimes } from '@fortawesome/fontawesome-pro-light';
import fontawesome from '@fortawesome/fontawesome';

fontawesome.library.add(faTimes);
fontawesome.library.add(faUserTimes);

@Component({
  selector: 'app-block-users-form',
  templateUrl: './block-users-form.component.html',
  styleUrls: ['./block-users-form.component.css']
})
export class BlockUsersFormComponent implements OnInit {
  @Input() blocked_users: BlockedUser[];

  private target;

  constructor(private _userService: UserService) { }

  ngOnInit() {
    this.target = '';
  }

  submitForm() {
    this._userService.postBlockedUser(this.target).subscribe(
      blocked_user => this.blocked_users.push(blocked_user));
    this.target = '';
  }

  unblockUser(index: number) {
    const blocked_username = this.blocked_users[index].target.username;
    this._userService.deleteBlockedUser(blocked_username).subscribe(
      deleted => this.blocked_users.splice(index, 1),
      error => console.log(error));
  }

  private keyDownFunction(event) {
    if (event.keyCode === 13) { this.submitForm(); }
  }
}
