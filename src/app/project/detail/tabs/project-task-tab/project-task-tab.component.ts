import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Skill } from 'app/models/skill';
import { User } from 'app/models/user';
import { AuthenticationService } from 'app/services/authentication.service';
import { Project } from 'app/models/project';
import { Task, TaskSubmission } from 'app/models/task';
import { ProjectService } from 'app/services/project.service';
import { TaskService } from 'app/services/task.service';

@Component({
  selector: 'app-project-task-tab',
  templateUrl: './project-task-tab.component.html',
  styleUrls: ['./project-task-tab.component.css']
})
export class ProjectTaskTabComponent implements OnInit {
  @Input() project: Project;
  @Output() addedSkill: EventEmitter<Skill> = new EventEmitter<Skill>();
  @Output() removedSkill: EventEmitter<Skill> = new EventEmitter<Skill>();

  private currentUser: User;
  private loadingData = true;

  constructor(private _authService: AuthenticationService,
    private _projectService: ProjectService,
    private _taskService: TaskService
  ) { }

  ngOnInit() {
    this._authService.getCurrentUser().subscribe(user => this.currentUser = user);
    this.getTasks();
  }

  private onDeletedTask(index: number) {
    this.project.tasks.splice(index, 1);
    this.project.task_count -= 1;
  }

  private getTasks() {
    this._projectService.getProjectTasks(this.project.id).subscribe(
      tasks => {
        this.project.task_count = tasks.length;
        this.project.tasks = tasks;
        this.loadingData = false;
      },
      error => {
        console.log(error);
        this.loadingData = false;
      }
    );
  }

  private appendTask(event: Task) {
    this.project.tasks.push(event);
    this.project.task_count += 1;
  }

  private getTaskCopy(task: Task) {
    const new_task = new Task(-1, '', '', new Date(), new Date(), '', false);
    Object.assign(new_task, task);
    return new_task;
  }
}
