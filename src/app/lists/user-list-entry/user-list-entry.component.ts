import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from 'app/services/authentication.service';
import { ImageService } from 'app/services/image.service';
import { User } from 'app/models/user';
import { faGlobe } from '@fortawesome/fontawesome-pro-light';
import fontawesome from '@fortawesome/fontawesome';

fontawesome.library.add(faGlobe);

@Component({
  selector: 'app-user-list-entry',
  templateUrl: './user-list-entry.component.html',
  styleUrls: ['./user-list-entry.component.css']
})
export class UserListEntryComponent implements OnInit {
  @Input() user: User;

  private currentUser: User;

  constructor(private _authService: AuthenticationService,
    private _imageService: ImageService) { }

  ngOnInit() {
    this._authService.getCurrentUser().subscribe(user => this.currentUser = user);
    this._imageService.getUserImage(this.user.username).subscribe(image => this.user.image = image);
  }
}
