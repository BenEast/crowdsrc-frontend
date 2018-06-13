import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../models/task';
import { Project } from 'app/models/project';
import { TaskService } from 'app/services/task.service';

@Component({
  selector: 'app-submit-task-form',
  templateUrl: './submit-task-form.component.html',
  styleUrls: ['./submit-task-form.component.css']
})
export class SubmitTaskFormComponent implements OnInit {
  @Input() project: Project;
  @Output() taskSubmitted: EventEmitter<Task> = new EventEmitter<Task>();

  private model = new Task(-1, '', '', new Date(), new Date(), '', false);
  constructor(private _taskService: TaskService) { }

  ngOnInit() { }

  private submitForm() {
    const task_json = JSON.stringify({
      project: this.project.id,
      title: this.model.title,
      description: this.model.description,
    });

    this._taskService.postTask(task_json).subscribe(
      result => {
        this.taskSubmitted.emit(result);
        this.resetForm();
      },
      error => console.log(error)
    );
  }

  private resetForm() {
    this.model.title = '';
    this.model.description = '';
  }
}
