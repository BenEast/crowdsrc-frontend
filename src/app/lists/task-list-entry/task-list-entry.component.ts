import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthenticationService } from 'app/services/authentication.service';
import { TaskService } from 'app/services/task.service';
import { Skill } from 'app/models/skill';
import { Task, TaskSubmission } from 'app/models/task';
import { User } from 'app/models/user';
import { faBan, faCheck, faTimes } from '@fortawesome/fontawesome-pro-solid';
import { faEdit } from '@fortawesome/fontawesome-pro-regular';
import fontawesome from '@fortawesome/fontawesome';

fontawesome.library.add(faBan);
fontawesome.library.add(faCheck);
fontawesome.library.add(faTimes);
fontawesome.library.add(faEdit);

@Component({
  selector: 'app-task-list-entry',
  templateUrl: './task-list-entry.component.html',
  styleUrls: ['./task-list-entry.component.css']
})
export class TaskListEntryComponent implements OnInit {
  @Input() task: Task;
  @Input() index = 0;
  @Input() allowEdit = false;
  @Input() allowSubmissions = false;
  @Input() showSubmissionView = false;
  @Input() showSaveButton = true;

  @Output() deletedTask: EventEmitter<number> = new EventEmitter<number>();
  @Output() addedSkill: EventEmitter<Skill> = new EventEmitter<Skill>();
  @Output() removedSkill: EventEmitter<Skill> = new EventEmitter<Skill>();
  @Output() unsaved: EventEmitter<any> = new EventEmitter<any>();

  private editMode = false;
  private editModel: Task = new Task(-1, '', '', new Date(), new Date(), '', false);

  private currentUser: User;
  private userSubmission: TaskSubmission;

  constructor(private _authService: AuthenticationService,
    private _taskService: TaskService) { }

  ngOnInit() {
    // If the task is completed, do not allow submissions
    if (this.task.status === 'complete') { this.allowSubmissions = false; }

    this._authService.getCurrentUser().subscribe(user => {
      this.currentUser = user;

      if (!this.userSubmission) {
        this.getUserSubmission();
      }
    });
    this.setEditModel();
  }

  private deleteTask() {
    this._taskService.deleteTask(this.task.id).subscribe(
      success => this.deletedTask.emit(this.index),
      error => console.log(error)
    );
  }

  private updateTask() {
    if (taskChanged(this.task, this.editModel)) {
      const task_json = JSON.stringify({
        title: this.editModel.title,
        description: this.editModel.description,
      });

      this._taskService.updateTask(task_json, this.editModel.id).subscribe(
        updated_task => {
          this.task = updated_task;
          this.editMode = false;
          this.setEditModel();
        },
        error => console.log(error)
      );
    } else { this.editMode = false; }
  }

  private onAddSubmission(event: TaskSubmission) {
    this.task.submissions.push(event);
    this.userSubmission = event;

    if (this.task.submissions.length === 1) {
      this.task.status = 'pending approval';
      this.allowSubmissions = true;
    }
  }

  private onAddedSkill(event) {
    const skills = this.task.skills;
    skills.push(event);
    this.task.skills = sortSkillList(skills);
    this.addedSkill.emit(event);
  }

  private onRemovedSkill(event: any, skill_index: number) {
    this.removedSkill.emit(this.task.skills[skill_index]);
    this.task.skills.splice(skill_index, 1)
  }

  private onTaskCompleted(event: boolean) {
    // update a task to be incomplete/complete if a task was accepted/unaccepted
    if (event) {
      this.task.status = 'complete';
      this.allowSubmissions = false;
    } else {
      this.task.status = 'pending approval';
      this.allowSubmissions = true;
    }
  }

  private onUserSubmissionDelete() {
    // Remove the userSubmission from submissions
    for (let i = 0; i < this.task.submissions.length; i++) {
      if (this.task.submissions[i].id === this.userSubmission.id) {
        this.task.submissions.splice(i, 1);
        break;
      }
    }
    this.userSubmission = undefined;

    // If no submissions, set status to incomplete
    if (!this.task.submissions.length) { this.task.status = 'incomplete'; }
  }

  private onUserSubmissionUpdate(new_submission: TaskSubmission) {
    this.userSubmission = new_submission;
  }

  private getUserSubmission() {
    if (!this.task || !this.currentUser) { return; }

    for (const submission of this.task.submissions) {
      if (submission.user_id === this.currentUser.id) {
        this.userSubmission = submission;
        return;
      }
    }
  }

  private setEditModel() {
    Object.assign(this.editModel, this.task);
  }
}

function taskChanged(original: Task, current: Task) {
  if (original.title !== current.title || original.status !== current.status ||
    original.description !== current.description) { return true; }
  return false;
}

function sortSkillList(list: Skill[]) {
  return list.sort((s1, s2): number => {
    if (s1.name < s2.name) { return -1; }
    if (s1.name > s2.name) { return 1; }
    return 0;
  });
}
