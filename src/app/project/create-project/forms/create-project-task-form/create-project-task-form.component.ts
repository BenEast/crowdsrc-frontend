import { Component, OnInit, Input } from '@angular/core';
import { Project } from 'app/models/project';
import { Task } from 'app/models/task';
import { Skill } from 'app/models/skill';
import { faPlus, faTimes } from '@fortawesome/fontawesome-pro-solid';
import { faUndoAlt, faQuestionCircle } from '@fortawesome/fontawesome-pro-regular';
import fontawesome from '@fortawesome/fontawesome';

fontawesome.library.add(faPlus);
fontawesome.library.add(faTimes);
fontawesome.library.add(faUndoAlt);
fontawesome.library.add(faQuestionCircle);

@Component({
  selector: 'app-create-project-task-form',
  templateUrl: './create-project-task-form.component.html',
  styleUrls: ['./create-project-task-form.component.css']
})
export class CreateProjectTaskFormComponent implements OnInit {
  @Input() model: Project;

  private title: string;
  private description: string;
  private skill: string;
  private skills: string[] = [];

  constructor() { }

  ngOnInit() { this.reset(); }

  private reset() {
    this.title = '';
    this.description = '';
    this.skill = '';
    this.skills = [];
  }

  saveTask() {
    if (!this.title) {
      this.reset();
      return;
    }

    // Create the skill list
    const skills: Skill[] = [];
    for (let i = 0; i < this.skills.length; i++) {
      skills.push(new Skill(this.skills[i]));
    }

    const now = new Date();
    this.model.tasks.push(new Task(-1, this.title, this.description, now, now, 'incomplete', false, skills));
    this.reset();
  }

  private onKeyDown(event) {
    if (event.keyCode === 13) {
      this.skills.push(this.skill.trim());
      this.skill = '';
    }
  }

  private removeSkill(index: number) {
    this.skills.splice(index, 1);
  }

  private removeTask(index: number) {
    this.model.tasks.splice(index, 1);
  }
}
