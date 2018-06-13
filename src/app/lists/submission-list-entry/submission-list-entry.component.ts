import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TaskSubmission } from 'app/models/task';
import { AuthenticationService } from 'app/services/authentication.service';
import { TaskService } from 'app/services/task.service';
import { User } from 'app/models/user';
import { faPlus, faTimes, faTrophy } from '@fortawesome/fontawesome-pro-solid';
import { faUpload } from '@fortawesome/fontawesome-pro-regular';
import fontawesome from '@fortawesome/fontawesome';

fontawesome.library.add(faPlus);
fontawesome.library.add(faTimes);
fontawesome.library.add(faTrophy);
fontawesome.library.add(faUpload);

@Component({
  selector: 'app-submission-list-entry',
  templateUrl: './submission-list-entry.component.html',
  styleUrls: ['./submission-list-entry.component.css']
})
export class SubmissionListEntryComponent implements OnInit {
  @Input() allowUpdate = false;
  @Input() submission: TaskSubmission;
  @Input() taskId: number;

  @Output() updatedSubmission: EventEmitter<TaskSubmission> = new EventEmitter<TaskSubmission>();
  @Output() deletedSubmission: EventEmitter<any> = new EventEmitter();

  private currentUser: User;
  private files = [];

  constructor(private _authService: AuthenticationService,
    private _taskService: TaskService) { }

  ngOnInit() {
    this._authService.getCurrentUser().subscribe(user => this.currentUser = user);
  }

  private deleteSubmission() {
    this._taskService.deleteTaskSubmission(this.taskId, this.submission.id).subscribe(
      deleted => this.deletedSubmission.emit(),
      error => console.log(error)
    );
  }

  private deleteSubmissionFile(file_index: number) {
    const file = this.submission.files[file_index];
    this._taskService.deleteSubmissionFile(file.id).subscribe(
      success => {
        // If the entire task submission was deleted, remove from the list
        // else delete only the submission file.
        if (success.json().submission_deleted) {
          this.deletedSubmission.emit();
        } else { this.submission.files.splice(file_index, 1); }
      },
      error => console.log(error)
    );
  }

  private deleteAddSubmissionFile(file_index: number) {
    this.files.splice(file_index, 1);
  }

  private getFileData(submission_index: number, file_index: number) {
    const file = this.submission.files[file_index];
    this._taskService.getFileData(file.id).subscribe(
      data => file.data = data.json().file,
      error => console.log(error)
    );
  }

  private onFileChange(event) {
    for (let i = 0; i < event.target.files.length; i++) {
      let read_file = true;
      const input_file = event.target.files[i];

      // If a file with the same name and size is already in the list, continue
      for (let j = 0; j < this.files.length; j++) {
        const file = this.files[j];

        if (input_file.name === file.filename && input_file.size === file.size) {
          read_file = false;
          break;
        } else if (input_file.size > 5242880) {
          read_file = false;
          break;
        }
      }
      if (read_file) { this.readFile(input_file); }
    }
    clearFileInput();
  }

  private readFile(file: File) {
    const reader: FileReader = new FileReader();

    const that = this;
    reader.onloadend = function (e) {
      that.files.push({ filename: file.name, data: reader.result, size: file.size });
    }
    reader.readAsDataURL(file);
  }

  private submitNewFiles() {
    const submission_json = JSON.stringify({ submission: this.files });

    this._taskService.updateTaskSubmission(this.taskId, this.submission.id, submission_json).subscribe(
      updated_submission => {
        this.updatedSubmission.emit(updated_submission);
        this.submission = updated_submission;
        this.files = [];
      },
      error => console.log(error)
    );
  }
}

function clearFileInput() {
  const ctrl = <HTMLInputElement>document.getElementById('add-file');
  try {
    ctrl.value = null;
  } catch (ex) { }
  if (ctrl.value) {
    ctrl.parentNode.replaceChild(ctrl.cloneNode(true), ctrl);
  }
}
