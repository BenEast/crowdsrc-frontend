import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'app/models/user';
import { TeamMessageReply } from 'app/models/team.message';
import { SharedService } from 'app/services/shared.service';
import { AuthenticationService } from 'app/services/authentication.service';
import { faBan, faCheck, faTimes } from '@fortawesome/fontawesome-pro-solid';
import { faEdit } from '@fortawesome/fontawesome-pro-regular';
import fontawesome from '@fortawesome/fontawesome';

fontawesome.library.add(faBan);
fontawesome.library.add(faCheck);
fontawesome.library.add(faTimes);
fontawesome.library.add(faEdit);

@Component({
  selector: 'app-team-message-reply-component',
  templateUrl: './team-message-reply.component.html',
  styleUrls: ['./team-message-reply.component.css']
})
export class TeamMessageReplyComponentComponent implements OnInit {
  @Input() messageId: number;
  @Input() reply: TeamMessageReply;
  @Input() index: number;
  @Output() deletedReply: EventEmitter<number> = new EventEmitter<number>();

  private currentUser: User;

  private edit_status = false;
  private edit_body: string;

  constructor(private _authService: AuthenticationService,
    private _sharedService: SharedService) { }

  ngOnInit() {
    this._authService.getCurrentUser().subscribe(user => this.currentUser = user);
    this.edit_body = this.reply.body;
  }

  private deleteReply() {
    this._sharedService.deleteMessageReply(this.messageId, this.reply.id).subscribe(
      deleted => this.deletedReply.emit(this.index),
      error => console.log(error)
    );
  }

  private updateReply() {
    this._sharedService.updateTeamMessageReply(this.messageId, this.reply.id, JSON.stringify({ body: this.edit_body })).subscribe(
      updated_reply => {
        updated_reply.user = this.currentUser;
        this.reply = updated_reply;
        this.edit_status = false;
      },
      error => console.log(error)
    );
  }
}
