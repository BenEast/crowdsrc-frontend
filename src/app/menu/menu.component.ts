import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  private isIn: boolean;
  private isAuthenticated: boolean;
  private currentUserId: number;

  constructor(private _authService: AuthenticationService, private _router: Router) { }
  ngOnInit() {
    this.isIn = false;
    this.isAuthenticated = this._authService.userIsAuthenticated();

    if (this.isAuthenticated) {
      // Get user id from token
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
  }

  private toggleState() {
    this.isIn = !this.isIn;
  }

  private logout() {
    if (this.isAuthenticated) {
      this._authService.logout();
    }
  }

  private routeTo(path: string) {
    this._router.navigateByUrl(path);

    if (this.isIn) {
      this.toggleState();
    }
  }
}
