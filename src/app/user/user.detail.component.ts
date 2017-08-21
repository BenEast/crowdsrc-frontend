import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { SharedService } from '../shared.service';
import { User } from './user';
import { Observable } from "rxjs";

@Component({
  selector: 'app-user',
  templateUrl: './user.detail.component.html',
  styleUrls: ['./user.detail.component.css']
})
export class UserDetailComponent implements OnInit {
  userId: number;
  user: User;
  currentUserId: number;
  isAuthenticated: boolean;
  showProjects: boolean;
  showComments: boolean;
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

  private getUser() {
    this._sharedService.getUser(this.userId)
      .subscribe(
      user => {
        this.user = user;
      },
      error => {
        console.log("Error with user detail component");
        console.log(error);
      });
  }

  routeTo(path: string) {
    this._router.navigateByUrl(path);
  }
}