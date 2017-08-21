import { Component, OnInit } from '@angular/core';
import { User } from '../user/user';
import { AuthenticationService } from '../authentication.service';
import { SharedService } from '../shared.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  currentUser: User;
  isAuthenticated: boolean = false;
  showRegistrationForm: boolean = false;

  constructor(private _authService: AuthenticationService, private _cookieService: CookieService,
    private _router: Router, private _sharedService: SharedService) { }

  ngOnInit() {
    this.showRegistrationForm = false;
    this.isAuthenticated = this._authService.userIsAuthenticated();

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

  routeTo(route: string) {
    this._router.navigateByUrl(route);
  }

  logout() {
    if (this.isAuthenticated) {
      this._cookieService.remove('crowdsrc');
      window.location.reload();
    }
  }
}
