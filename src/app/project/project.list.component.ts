import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { SharedService } from '../shared.service';
import { Project } from './project';

@Component({
  selector: 'app-project-list',
  templateUrl: './project.list.component.html',
  styleUrls: ['./project.list.component.css']
})
export class ProjectListComponent implements OnInit {
  projects: Project[] = [];
  isAuthenticated: boolean;

  constructor(private _authService: AuthenticationService, private _router: Router, private _sharedService: SharedService) {
    this.isAuthenticated = this._authService.userIsAuthenticated();
  }

  ngOnInit() {
    this.isAuthenticated = this._authService.userIsAuthenticated();
    this.loadProjects();
  }

  loadProjects() {
    this._sharedService.getProjects()
      .subscribe(
      projects => this.projects = projects.reverse(),
      error => {
        console.log("Error with categories");
        console.log("Error: " + error);
      });
  }

  routeTo(path: string) {
    this._router.navigateByUrl(path);
  }
}
