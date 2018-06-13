import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TeamMessage } from 'app/models/team.message';
import { SharedService } from 'app/services/shared.service';
import { User } from 'app/models/user';
import { AuthenticationService } from 'app/services/authentication.service';
import { faBan, faCheck, faTimes } from '@fortawesome/fontawesome-pro-solid';
import { faEdit } from '@fortawesome/fontawesome-pro-regular';
import fontawesome from '@fortawesome/fontawesome';

fontawesome.library.add(faBan);
fontawesome.library.add(faCheck);
fontawesome.library.add(faTimes);
fontawesome.library.add(faEdit);

@Component({
  selector: 'app-team-message-component',
  templateUrl: './team-message.component.html',
  styleUrls: ['./team-message.component.css']
})
export class TeamMessageComponentComponent implements OnInit {
  @Input() message: TeamMessage;
  @Input() index: number;
  @Output() deletedMessage: EventEmitter<number> = new EventEmitter<number>();
  @Output() deletedReply: EventEmitter<any> = new EventEmitter<any>();

  private currentUser: User;
  private edit_body: string;
  private edit_status = false;

  constructor(private _authService: AuthenticationService,
    private _sharedService: SharedService) { }

  ngOnInit() {
    this._authService.getCurrentUser().subscribe(user => this.currentUser = user);
    this.edit_body = this.message.body;
  }

  private onReplyCreate(event) {
    event.user = this.currentUser;
    this.message.replies.push(event);
  }

  private onReplyDelete(event) {
    this.message.replies.splice(event, 1);
    this.deletedReply.emit()
  }

  private updateTeamMessage() {
    const message_json = JSON.stringify({ body: this.edit_body });

    this._sharedService.updateTeamMessage(message_json, this.message.id).subscribe(
      updated_message => {
        updated_message.user = this.currentUser;
        this.message = updated_message;
        this.edit_status = false;
      },
      error => console.log(error)
    );
  }

  private deleteTeamMessage() {
    this._sharedService.deleteTeamMessage(this.message.id).subscribe(
      success => this.deletedMessage.emit(this.index),
      error => console.log(error)
    );
  }
}
