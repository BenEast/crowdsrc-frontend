import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { SharedService } from '../shared.service';
import { Project } from './project';
import { Comment } from '../comment/comment';
import { User } from '../user/user';

@Component({
  selector: 'app-project',
  templateUrl: './project.detail.component.html',
  styleUrls: ['./project.detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  projectId: number;
  userId: number;
  currentUser: User;
  project: Project;
  isAuthenticated: boolean;
  currentTab: string;

  constructor(private activatedRoute: ActivatedRoute,
    private _authService: AuthenticationService,
    private _router: Router,
    private _sharedService: SharedService) { }

  ngOnInit() {
    this.currentTab = 'detail';
    this.isAuthenticated = this._authService.userIsAuthenticated();
    if (this.isAuthenticated) {
      this._authService.getCurrentUserId().subscribe(
        response => {
          this.userId = response.json().user_id;
          this._sharedService.getUser(this.userId).subscribe(
            user => {
              this.currentUser = user;
            }
          )
        },
        (error: any) => {
          console.log("Error validating user token");
          console.log(error);
        }
      );
    }

    this.activatedRoute.params.subscribe((params: Params) => {
      this.projectId = params['id'];
      this.getProject();
    });
  }

  private getProject() {
    this._sharedService.getProject(this.projectId).subscribe(
      project => {
        this.project = project;
      },
      error => {
        console.log("Error loading project detail " + this.projectId);
        console.log(error);
      }
    );
  }

  private submitComment(commentBody: string) {
    if (commentBody) {
      let comment_json = JSON.stringify({
        "user": this.userId,
        "project": this.projectId,
        "comment_body": commentBody
      });
      this.project.comments.push(new Comment(-1, this.currentUser, this.project, commentBody, ""));
      this._sharedService.postComment(comment_json).subscribe(
        success => {
          this.getProject();
        },
        error => {
          console.log("Error posting comment");
          console.log(error.json());
        }
      );
    }
  }

  private deleteComment(commentId: number) {
    if (commentId) {
      // Remove the comment from this.project.comments
      for (var i = 0; i < this.project.comments.length; i++) {
        if (this.project.comments[i].id == commentId) {
          this.project.comments.splice(i, 1);
        }
      }
      this._sharedService.deleteComment(commentId).subscribe(
        success => { },
        error => {
          console.log("Error deleting comment " + commentId);
          console.log(error);
        }
      );
    }
  }

  private routeTo(path: string) {
    this._router.navigateByUrl(path);
  }
}
