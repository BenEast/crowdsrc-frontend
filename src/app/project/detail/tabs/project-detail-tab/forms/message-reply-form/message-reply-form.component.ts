import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TeamMessageReply } from 'app/models/team.message';
import { SharedService } from 'app/services/shared.service';

@Component({
  selector: 'app-message-reply-form',
  templateUrl: './message-reply-form.component.html',
  styleUrls: ['./message-reply-form.component.css']
})
export class MessageReplyFormComponent implements OnInit {
  @Input() messageId: number;
  @Output() addedReply: EventEmitter<TeamMessageReply> = new EventEmitter<TeamMessageReply>();

  private body = '';

  constructor(private _sharedService: SharedService) { }

  ngOnInit() { }

  submitForm() {
    this._sharedService.postTeamMessageReply(this.messageId, JSON.stringify({ body: this.body })).subscribe(
      reply => this.addedReply.emit(reply),
      error => console.log(error)
    );
    this.body = '';
  }
}
