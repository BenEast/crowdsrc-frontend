import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { SharedService } from '../../services/shared.service';
import { User } from '../../models/user';
import { Project } from '../../models/project';

@Component({
  selector: 'app-user',
  templateUrl: './user.detail.component.html',
  styleUrls: ['./user.detail.component.css']
})
export class UserDetailComponent implements OnInit {
  private userId: number;
  private user: User;
  private formUser: string;
  private currentUserId: number;
  private isAuthenticated: boolean;
  private currentTab: string;

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
          this.currentUserId = response.json().user_id;
        },
        (error: any) => {
          console.log("Error validating user token");
          console.log(error);
        }
      );
    }

    this.activatedRoute.params.subscribe((params: Params) => {
      this.userId = params['id'];
      this.getUser();
    });
  }

  private routeTo(path: string) {
    this._router.navigateByUrl(path);
  }

  private onUpdate($event) {
    this.user = JSON.parse($event);
    this.getUser();
  }

  private getUser() {
    this._sharedService.getUser(this.userId)
      .subscribe(
      user => {
        this.user = user;
        this.formUser = JSON.stringify(user);
      },
      error => {
        console.log("Error with user detail component");
        console.log(error);
      });
  }
}