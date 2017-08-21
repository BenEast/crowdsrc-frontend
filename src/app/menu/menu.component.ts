import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user/user';
import { AuthenticationService } from '../authentication.service';
import { SharedService } from '../shared.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  currentUser: User;
  isAuthenticated = false;
  loginStatus: string;

  constructor(private _authService: AuthenticationService, private _router: Router, private _sharedService: SharedService) { }

  ngOnInit() {
    this.isAuthenticated = this._authService.userIsAuthenticated();
    this.setLoginStatus();
    if (this.isAuthenticated) {
      // Get user id from token
      this._authService.getCurrentUserId().subscribe(
        response => {
          let currentUserId = response.json().user_id;
          // Get user object from id
          this._sharedService.getUser(currentUserId).subscribe(
            user => this.currentUser = user,
            (error: any) => {
              console.log("Error getting user " + currentUserId);
              console.log(error);
            }
          );
        },
        (error: any) => {
          console.log("Error validating user token");
          console.log(error);
        }
      );
    }
  }

  routeTo(path: string) {
    this._router.navigateByUrl(path);
  }

  private setLoginStatus() {
    if (this.isAuthenticated) {
      this.loginStatus = 'Logout';
    } else {
      this.loginStatus = 'Login';
    }
  }

  private logout() {
    if (this.isAuthenticated) {
      Cookie.delete('crowdsrc');
      window.location.reload();
    }
  }
}
