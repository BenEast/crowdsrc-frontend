import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { faStar } from '@fortawesome/fontawesome-pro-solid';
import { faStar as faStarO } from '@fortawesome/fontawesome-pro-regular';
import fontawesome from '@fortawesome/fontawesome';

fontawesome.library.add(faStar);
fontawesome.library.add(faStarO);

@Component({
  selector: 'app-save-task-form',
  templateUrl: './save-task-form.component.html',
  styleUrls: ['./save-task-form.component.css']
})
export class SaveTaskFormComponent implements OnInit {
  @Input() taskId: number;
  @Input() isSaved: boolean;

  @Output() unsaved: EventEmitter<any> = new EventEmitter<any>();

  constructor(private _taskService: TaskService) { }
  ngOnInit() { }

  private saveTask() {
    this._taskService.postTaskSave(this.taskId).subscribe(saved => this.isSaved = true);
  }

  private unsaveTask() {
    this._taskService.deleteTaskSave(this.taskId).subscribe(unsaved => {
      this.isSaved = false;
      this.unsaved.emit();
    });
  }
}
