import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SharedService } from '../../../../../../services/shared.service';

@Component({
  selector: 'app-delete-team-message-modal',
  templateUrl: './delete-team-message-modal.component.html',
  styleUrls: ['./delete-team-message-modal.component.css']
})
export class DeleteTeamMessageModalComponent implements OnInit {
  @Input() messageId: number;
  @Output() refreshProject: EventEmitter<any> = new EventEmitter();

  constructor(private _sharedService: SharedService) { }

  ngOnInit() { }

  private deleteTeamMessage() {
    this._sharedService.deleteTeamMessage(this.messageId).subscribe(
      success => {
        this.refreshProject.emit(null);
      },
      error => {
        console.log("Error deleting message " + this.messageId);
        console.log(error);
      }
    )
  }
}