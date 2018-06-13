import { Component, OnInit, Input } from '@angular/core';
import { User } from 'app/models/user';
import { AuthenticationService } from 'app/services/authentication.service';
import { UserService } from 'app/services/user.service';
import { faCog, faPlusSquare, faSignOutAlt, faUserCircle } from '@fortawesome/fontawesome-pro-solid';
import fontawesome from '@fortawesome/fontawesome';

fontawesome.library.add(faUserCircle);
fontawesome.library.add(faCog);
fontawesome.library.add(faPlusSquare);
fontawesome.library.add(faSignOutAlt);

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  private currentUser: User;
  private showRegistrationForm = false;

  private taskSuggestions: any;
  private loadingTaskSuggestions = true;

  private loadingUser = true;

  constructor(private _authService: AuthenticationService,
    private _userService: UserService) { }

  ngOnInit() {
    this._authService.getCurrentUser().subscribe(
      user => {
        this.currentUser = user;

        if (user) {
          this.showRegistrationForm = false;
          this.getTaskSuggestions();
        }
        this.loadingUser = false;
      });
  }

  private getTaskSuggestions() {
    this._userService.getTaskSuggestions().subscribe(
      suggestions => {
        console.log(suggestions.json())
        this.taskSuggestions = suggestions.json();
        this.loadingTaskSuggestions = false;
      },
      error => this.loadingTaskSuggestions = false
    );
  }

  private getReviewSuggestions() {
    this._userService.getReviewSuggestions().subscribe(
      reviews => console.log(reviews.json()),
      error => console.log(error)
    );
  }

  private onTaskSuggestionDismiss() {
    // Try to load additional (different) suggestions if we're on the last one
    if (this.taskSuggestions.length === 1) {

    }
    this.taskSuggestions.shift();
  }

  private logout() {
    this._authService.logout();
  }
}
