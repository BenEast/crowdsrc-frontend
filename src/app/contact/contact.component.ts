import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { AuthenticationService } from '../services/authentication.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  private contact = { "email": "", "name": "", "message": "" };
  private currentUser;
  private messageSuccessful: boolean = false;
  private isAuthenticated: boolean = false;
  constructor(private _authService: AuthenticationService, private _sharedService: SharedService) { }

  ngOnInit() {
    this.isAuthenticated = this._authService.userIsAuthenticated();
    this.messageSuccessful = false;

    if (this.isAuthenticated) {
      // Get user id from token
      this._authService.getCurrentUserId().subscribe(
        response => {
          let currentUserId = response.json().user_id;
          // Get user object from id
          this._sharedService.getUser(currentUserId).subscribe(
            user => {
              this.currentUser = user;
            },
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

  private sendMail() {
    let contact_json = {};
    if (this.isAuthenticated && this.currentUser) {
      contact_json['username'] = this.currentUser.username;
      contact_json['email'] = this.currentUser.email;
      contact_json['name'] = this.currentUser.name;
    } else {
      contact_json['username'] = "";
      contact_json['email'] = this.contact.email;
      contact_json['name'] = this.contact.name;
    }
    contact_json['message'] = this.contact.message;

    this.messageSuccessful = true;
    this._sharedService.postContact(contact_json).subscribe(
      success => {
        console.log(success);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

}
