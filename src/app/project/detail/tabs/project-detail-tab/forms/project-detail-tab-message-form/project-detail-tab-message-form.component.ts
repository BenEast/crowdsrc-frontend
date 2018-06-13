import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TeamMessage } from 'app/models/team.message';
import { SharedService } from 'app/services/shared.service';

@Component({
  selector: 'app-project-detail-tab-message-form',
  templateUrl: './project-detail-tab-message-form.component.html',
  styleUrls: ['./project-detail-tab-message-form.component.css']
})
export class ProjectDetailTabMessageFormComponent implements OnInit {
  @Input() projectId: number;
  @Input() userId: number;
  @Output() postedMessage: EventEmitter<TeamMessage> = new EventEmitter<TeamMessage>();

  private body: string;

  constructor(private _sharedService: SharedService) { }

  ngOnInit() {
    this.body = '';
  }

  private submitTeamMessage() {
    if (this.body) {
      const message_json = JSON.stringify({
        project: this.projectId,
        body: this.body
      });

      this.body = '';

      this._sharedService.postTeamMessage(message_json).subscribe(
        message => this.postedMessage.emit(message),
        error => console.log(error));
    }
  }
}
