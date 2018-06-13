import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TaskSubmission } from 'app/models/task';
import { TaskService } from 'app/services/task.service';
import { User } from 'app/models/user';
import { AuthenticationService } from 'app/services/authentication.service';
import { faSquare, faCheckSquare, faCheckCircle } from '@fortawesome/fontawesome-pro-regular';
import fontawesome from '@fortawesome/fontawesome';

fontawesome.library.add(faSquare);
fontawesome.library.add(faCheckSquare);
fontawesome.library.add(faCheckCircle);

@Component({
  selector: 'app-submissions-view',
  templateUrl: './submissions-view.component.html',
  styleUrls: ['./submissions-view.component.css']
})
export class SubmissionsViewComponent implements OnInit {
  @Input() submissions: TaskSubmission[];
  @Input() taskId: number;
  @Input() index: number;
  @Output() taskCompleted: EventEmitter<boolean> = new EventEmitter<boolean>();

  private currentUser: User;
  private acceptedSubmission: TaskSubmission;

  constructor(private _authService: AuthenticationService,
    private _taskService: TaskService) { }

  ngOnInit() {
    this.getAcceptedSubmission();
    this._authService.getCurrentUser().subscribe(user => this.currentUser = user);
  }

  // Check if any submission has been accepted
  private getAcceptedSubmission() {
    if (!this.submissions.length) { return; }

    for (const submission of this.submissions) {
      if (submission.is_accepted) {
        this.acceptedSubmission = submission;
        return;
      }
    }
  }

  private toggleAccept(new_value: boolean, index?: number) {
    // If a different submission has already been accepted, don't
    // allow another to be accepted
    if (new_value === true) {
      for (const submission of this.submissions) {
        if (submission.is_accepted) { return; }
      }
    }

    const submission = index !== undefined ? this.submissions[index] : this.acceptedSubmission;

    this._taskService.updateTaskSubmission(this.taskId, submission.id, JSON.stringify({ 'is_accepted': new_value })).subscribe(
      updated_submission => {
        submission.is_accepted = updated_submission.is_accepted;

        // Remove the accepted submission if exists
        if (!submission.is_accepted && this.acceptedSubmission && this.acceptedSubmission.id === submission.id) {
          this.acceptedSubmission = undefined;
        } else { this.acceptedSubmission = submission; }

        // Notify if the task has been marked as completed
        this.taskCompleted.emit(submission.is_accepted);
      },
      error => console.log(error),
    );
  }
}
