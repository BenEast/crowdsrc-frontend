import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { Project } from '../../models/project';

@Component({
  selector: 'app-project',
  templateUrl: './project.detail.component.html',
  styleUrls: ['./project.detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  private project: Project;
  private currentTab: string;

  constructor(private activatedRoute: ActivatedRoute,
    private _router: Router,
    private _sharedService: SharedService) { }

  ngOnInit() {
    this.currentTab = 'detail';

    this.activatedRoute.params.subscribe((params: Params) => {
      this.getProject(params['id']);
    });
  }

  private getProject(projectId: number) {
    if (projectId) {
      this._sharedService.getProject(projectId).subscribe(
        project => {
          this.project = project;
        },
        error => {
          console.log("Error loading project detail " + projectId);
          console.log(error);
        }
      );
    }
  }

  private routeTo(path: string) {
    if (path) {
      this._router.navigateByUrl(path);
    }
  }
}
