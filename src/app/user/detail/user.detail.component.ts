import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ImageService } from 'app/services/image.service';
import { User } from 'app/models/user';
import { AuthenticationService } from 'app/services/authentication.service';
import { UserService } from 'app/services/user.service';
import { faPencil, faFileAlt, faChartLine, faTasks, faUsers, faIdCard } from '@fortawesome/fontawesome-pro-regular';
import fontawesome from '@fortawesome/fontawesome';

fontawesome.library.add(faPencil);
fontawesome.library.add(faFileAlt);
fontawesome.library.add(faChartLine);
fontawesome.library.add(faTasks);
fontawesome.library.add(faUsers);
fontawesome.library.add(faIdCard);

declare var $: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.detail.component.html',
  styleUrls: ['./user.detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user: User = new User(-1, '', false);
  private currentUser: User;
  private currentTab: string;
  private blocked = false;

  constructor(private _activatedRoute: ActivatedRoute,
    private _authService: AuthenticationService,
    private _imageService: ImageService,
    private _userService: UserService) {
  }

  ngOnInit() {
    const tabs = ['details', 'stats', 'tasks', 'crowd'];
    this._activatedRoute.queryParams.subscribe(params => {
      let tab_param = params['tab'];
      if (tab_param) { tab_param = tab_param.toLowerCase(); }
      this.currentTab = tabs.includes(tab_param) ? tab_param : 'details';
    });

    this._activatedRoute.params.subscribe((params: Params) => {
      const username = params['username'];

      if (username !== this.user.username) {
        this.user = new User(-1, '', false);
        this._authService.getCurrentUser().subscribe(user => {
          this.currentUser = user;
          this.getUser(username);
        });
      }
    });
  }

  private onImageUpload(image) {
    this.user.image = image;
    this.currentUser.image = image;
    $('#userImageModal').modal('hide'); // Dismiss the image modal
  }

  private getUser(username: string) {
    this._userService.getUser(username).subscribe(
      user => {
        this.user = user;
        this.getUserImage(this.user.username);
      },
      error => {
        if (error === 'blocked') { this.blocked = true; }
      }
    );
  }

  private getUserImage(username: string) {
    this._imageService.getUserImage(username).subscribe(image => this.user.image = image);
  }
}
