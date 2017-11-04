import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { SharedService } from '../../services/shared.service';
import { Project } from '../../models/project';

@Component({
  selector: 'app-project-list',
  templateUrl: './project.list.component.html',
  styleUrls: ['./project.list.component.css']
})
export class ProjectListComponent implements OnInit {
  private projects: Project[] = [];
  private isAuthenticated: boolean;

  constructor(private _authService: AuthenticationService, private _router: Router, private _sharedService: SharedService) {
    this.isAuthenticated = this._authService.userIsAuthenticated();
  }

  ngOnInit() {
    this.isAuthenticated = this._authService.userIsAuthenticated();
    this.loadProjects();
  }

  private loadProjects() {
    this._sharedService.getProjects()
      .subscribe(
      projects => {
        this.projects = projects.reverse();
      },
      error => {
        console.log("Error with project list component");
        console.log("Error: " + error);
      });
  }

  private routeTo(path: string) {
    this._router.navigateByUrl(path);
  }
}
