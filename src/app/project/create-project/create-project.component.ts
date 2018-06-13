import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'app/models/user';
import { AuthenticationService } from '../../services/authentication.service';
import { ProjectService } from '../../services/project.service';
import { Project } from 'app/models/project';
import { Router } from '@angular/router';
import { CreateProjectTaskFormComponent } from './forms/create-project-task-form/create-project-task-form.component';
import { faCheck, faArrowLeft, faArrowRight } from '@fortawesome/fontawesome-pro-solid';
import fontawesome from '@fortawesome/fontawesome';

fontawesome.library.add(faCheck);
fontawesome.library.add(faArrowLeft);
fontawesome.library.add(faArrowRight);

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {

  private currentUser: User;
  private model: Project;
  private stage: number;

  @ViewChild(CreateProjectTaskFormComponent) taskForm: CreateProjectTaskFormComponent;

  constructor(private _authService: AuthenticationService,
    private _projectService: ProjectService,
    private _router: Router) { }

  ngOnInit() {
    this.stage = 1;
    this.resetProjectModel();
    this._authService.getCurrentUser().subscribe(user => this.currentUser = user);
  }

  private resetProjectModel() {
    this.model = new Project(-1, '', undefined, [], '', '', '', -1, -1);
  }

  private back() {
    if (this.stage === 2) { this.stage -= 1; }
  }

  private next() {
    if (this.stage === 1) { this.stage += 1; }
  }

  private submit() {
    // Try to save the task before continuing
    this.taskForm.saveTask();

    const project_json: string = JSON.stringify({
      title: this.model.title,
      description: this.model.description,
      categories: this.model.categories.map(function (e) { return e.name; }),
      tasks: this.model.tasks.map(function (e) {
        return {
          title: e.title,
          description: e.description,
          skills: e.skills.map(function (s) { return s.name; })
        }
      })
    });

    this._projectService.postProject(project_json).subscribe(
      response => this._router.navigateByUrl('/src/' + response.json().id),
      error => console.log(error),
    );
  }
}
