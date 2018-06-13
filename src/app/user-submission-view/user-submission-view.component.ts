import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TaskSubmission } from 'app/models/task';
import { TaskService } from 'app/services/task.service';

@Component({
  selector: 'app-user-submission-view',
  templateUrl: './user-submission-view.component.html',
  styleUrls: ['./user-submission-view.component.css']
})
export class UserSubmissionViewComponent implements OnInit {
  @Input() allowUpdate = true;
  @Input() submission: TaskSubmission;
  @Input() taskId: number;

  @Output() updatedSubmission: EventEmitter<TaskSubmission> = new EventEmitter<TaskSubmission>();
  @Output() deletedSubmission: EventEmitter<any> = new EventEmitter();

  constructor() { }
  ngOnInit() { }
}
