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
  private contact = { 'email': '', 'name': '', 'message': '' };
  private currentUser: User;
  private messageSuccessful = false;

  constructor(private _authService: AuthenticationService, private _sharedService: SharedService) { }

  ngOnInit() {
    this._authService.getCurrentUser().subscribe(user => this.currentUser = user);
  }

  private sendMail() {
    const contact_json = JSON.stringify({
      username: this.currentUser ? this.currentUser.username : 'NON-AUTHENTICATED',
      email: this.currentUser ? this.currentUser.email : this.contact.email,
      name: this.contact.name,
      message: this.contact.message
    });

    this._sharedService.postContact(contact_json).subscribe(
      success => this.messageSuccessful = true);
  }
}
