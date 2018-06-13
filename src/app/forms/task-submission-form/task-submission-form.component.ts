import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TaskService } from 'app/services/task.service';
import { TaskSubmission } from 'app/models/task';
import { faCheck } from '@fortawesome/fontawesome-pro-solid';
import { faUpload } from '@fortawesome/fontawesome-pro-regular';
import fontawesome from '@fortawesome/fontawesome';

fontawesome.library.add(faCheck);
fontawesome.library.add(faUpload);

@Component({
  selector: 'app-task-submission-form',
  templateUrl: './task-submission-form.component.html',
  styleUrls: ['./task-submission-form.component.css']
})
export class TaskSubmissionFormComponent implements OnInit {
  @Input() taskId: number;
  @Output() addedSubmission: EventEmitter<TaskSubmission> = new EventEmitter<TaskSubmission>();

  private files = [];
  private success = false;
  private failure = false;

  constructor(private _taskService: TaskService) { }

  ngOnInit() { }

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
      that.files.push({ filename: file.name, data: reader.result });
    }
    reader.readAsDataURL(file);
  }

  private removeFile(index: number) {
    this.files.splice(index, 1);
  }

  private submit() {
    this._taskService.postTaskSubmission(this.taskId, JSON.stringify({ 'submission': this.files })).subscribe(
      success => {
        this.files = [];
        this.failure = false;
        this.success = true;
        this.addedSubmission.emit(success);
      },
      error => {
        this.success = false;
        this.failure = true;
        console.log(error);
      }
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
