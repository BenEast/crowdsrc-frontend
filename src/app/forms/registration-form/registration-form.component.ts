import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['../forms.css']
})
export class RegistrationFormComponent implements OnInit {
  @Input() hideTitle: boolean = false;
  private model = new User(1, "", "", "", "", "", "", "", [], "", "", "", "");

  constructor(private _authService: AuthenticationService, private _router: Router, private _sharedService: SharedService) { }
  ngOnInit() { }

  private submitUser() {
    let user_json = JSON.parse(JSON.stringify(this.model));
    user_json.first_name = "";
    user_json.last_name = "";

    this._sharedService.postUser(user_json).subscribe(
      success => {
        this._authService.submitCredentials(user_json);

        if (this._authService.userIsAuthenticated()) {
          window.location.reload();
        }
      },
      error => {
        console.log("Error with user registration.");
        console.log(error.body);
      }
    );
  }
}
