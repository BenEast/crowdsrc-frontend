import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from '../../../../models/project';
import { User } from '../../../../models/user';
import { TeamMessage } from '../../../../models/team.message';
import { AuthenticationService } from '../../../../services/authentication.service';
import { SharedService } from '../../../../services/shared.service';

@Component({
  selector: 'app-project-detail-tab',
  templateUrl: './project-detail-tab.component.html',
  styleUrls: ['./project-detail-tab.component.css']
})
export class ProjectDetailTabComponent implements OnInit {
  @Input() project: Project;
  @Output() refreshProject: EventEmitter<any> = new EventEmitter();

  private currentUser: User;
  private userIsOnTeam: boolean;

  constructor(private _authService: AuthenticationService,
    private _sharedService: SharedService,
    private _router: Router) { }

  ngOnInit() {
    this.userIsOnTeam = false;

    if (this._authService.userIsAuthenticated()) {
      this._authService.getCurrentUserId().subscribe(
        response => {
          let user_id = response.json().user_id;
          this.isUserOnTeam(user_id);
          this._sharedService.getUser(user_id).subscribe(
            user => this.currentUser = user,
            error => {
              console.log("Error getting user with id " + user_id);
              console.log(error.json());
            }
          )
        },
        (error: any) => {
          console.log("Error validating user token");
          console.log(error);
        }
      );
    } else {
      // Set to a default, fake user with -1 as user Id
      this.currentUser = new User(-1, "", "", "", "", "", "", "", [], "", "", "", "");
    }
  }

  private submitTeamMessage(messageBody: string, isPrivate: boolean) {
    if (messageBody) {
      let message_time = JSON.stringify(new Date());
      let message_json = JSON.stringify({
        "team": 1,
        "user": 1,
        "body": messageBody,
        "is_public": !isPrivate
      });
      this.project.team.messages.push(new TeamMessage(-1, this.currentUser, messageBody, '', true));
      this._sharedService.postTeamMessage(message_json).subscribe(
        success => this.emitRefreshProject(),
        error => {
          console.log("Error posting team message");
          console.log(error.json());
        }
      );
    }
  }

  private emitRefreshProject() {
    this.refreshProject.emit(null);
  }

  private isUserOnTeam(userId: number) {
    if (userId) {
      for (var i = 0; i < this.project.team.members.length; i++) {
        if (this.project.team.members[i].user_id == userId) {
          this.userIsOnTeam = true;
          return;
        }
      }
    }
  }

  private routeTo(path: string) {
    if (path) {
      this._router.navigateByUrl(path);
    }
  }
}
