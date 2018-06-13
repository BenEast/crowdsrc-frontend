import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { Project } from '../../models/project';
import { User } from '../../models/user';
import { ProjectDetailTabComponent } from 'app/project/detail/tabs/project-detail-tab/project-detail-tab.component';
import { ProjectService } from 'app/services/project.service';
import { Skill } from 'app/models/skill';
import { faBan, faCheck, faStar } from '@fortawesome/fontawesome-pro-solid';
import { faChartLine, faEdit, faFileAlt, faTasks } from '@fortawesome/fontawesome-pro-regular';
import fontawesome from '@fortawesome/fontawesome';

fontawesome.library.add(faBan);
fontawesome.library.add(faCheck);
fontawesome.library.add(faStar);
fontawesome.library.add(faChartLine);
fontawesome.library.add(faEdit);
fontawesome.library.add(faFileAlt);
fontawesome.library.add(faTasks);

@Component({
  selector: 'app-project',
  templateUrl: './project.detail.component.html',
  styleUrls: ['./project.detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  private currentTab: string;

  private edit_mode = false;
  private edit_title: string;
  private edit_website: string;

  private currentUser: User;
  project: Project = new Project(-1, '', new User(-1, '', false), [], '', '', '', -1, -1);

  @ViewChild(ProjectDetailTabComponent) private detailTab: ProjectDetailTabComponent;

  constructor(private _activatedRoute: ActivatedRoute,
    private _authService: AuthenticationService,
    private _projectService: ProjectService) { }

  ngOnInit() {
    const tabs = ['project', 'tasks', 'stats'];
    this._activatedRoute.queryParams.subscribe(params => {
      let tab_param = params['tab'];
      if (tab_param) { tab_param = tab_param.toLowerCase(); }
      this.currentTab = tabs.includes(tab_param) ? tab_param : 'project';
    });

    this._activatedRoute.params.subscribe((params: Params) => this.getProject(params['id']));
    this._authService.getCurrentUser().subscribe(user => this.currentUser = user);
  }

  private onAddSkill(event: Skill) {
    const top_skills = this.project.top_skills;
    // Update top skills for the project
    for (let i = 0; i < top_skills.length; i++) {
      if (top_skills[i][0] === event.name) {
        top_skills[i][1] += 1;
        this.project.top_skills = sortTopSkills(top_skills);
        return;
      }
    }
    // Add if the new skill isn't in the list and there's less than 5 top skills
    if (top_skills.length < 5) {
      top_skills.push([event.name, 1]);
      this.project.top_skills = sortTopSkills(top_skills);
    }
  }

  private onDeleteSkill(event: Skill) {
    const top_skills = this.project.top_skills;

    // Update top skills for the project
    for (let i = 0; i < top_skills.length; i++) {
      if (top_skills[i][0] === event.name) {
        // Remove the entry from top skills if count is 1
        if (top_skills[i][1] === 1) {
          top_skills.splice(i, 1);
        } else { top_skills[i][1] -= 1; }

        this.project.top_skills = sortTopSkills(top_skills);
        break;
      }
    }
  }

  private onEditCancel() {
    this.edit_mode = false;
    this.edit_title = this.project.title;
    this.edit_website = this.project.website;
    if (this.detailTab) { this.detailTab.edit_description = this.project.description; }
  }

  private updateProject() {
    const project_json = JSON.stringify({
      title: this.edit_title,
      website: this.edit_website,
      description: this.detailTab.edit_description
    });

    this._projectService.updateProject(this.project.id, project_json).subscribe(
      updated_project => {
        this.project.title = updated_project.title;
        this.project.website = updated_project.website;
        this.project.description = updated_project.description;
        this.project.last_updated = updated_project.last_updated;

        this.edit_mode = false;
      },
      error => console.log(error)
    );
  }

  private getProject(id: number) {
    this._projectService.getProject(id).subscribe(
      project => {
        this.project = project;
        this.edit_title = project.title;
        this.edit_website = project.website;
      },
      error => console.log(error)
    );
  }
}

function sortTopSkills(list): number {
  return list.sort((s1, s2): number => {
    if (s1[1] > s2[1]) { return -1; }
    if (s1[1] < s2[1]) { return 1; }
    return 0;
  });
}
