import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { NavigationEnd, Router } from '@angular/router';
import { User } from '../models/user';
import { ImageService } from 'app/services/image.service';
import { faCog, faEnvelope, faPlusSquare, faQuestionCircle } from '@fortawesome/fontawesome-pro-solid';
import { faSearch, faSignInAlt, faSignOutAlt, faUserCircle } from '@fortawesome/fontawesome-pro-solid';
import { faBars, faUsers, faLightbulb } from '@fortawesome/fontawesome-pro-solid';
import fontawesome from '@fortawesome/fontawesome';
import { NotificationService } from 'app/services/notification.service';

fontawesome.library.add(faBars);
fontawesome.library.add(faUsers);
fontawesome.library.add(faLightbulb);
fontawesome.library.add(faUserCircle);
fontawesome.library.add(faCog);
fontawesome.library.add(faEnvelope);
fontawesome.library.add(faPlusSquare);
fontawesome.library.add(faQuestionCircle);
fontawesome.library.add(faSearch);
fontawesome.library.add(faSignInAlt);
fontawesome.library.add(faSignOutAlt);

declare var $: any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  private xsView: boolean;
  private currentUser: User;
  private searchValue = '';
  private showSearchDropdown = false;
  private page: string;

  @ViewChild('searchbar') search_bar: any;

  // set xsView based on window width
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (window.innerWidth > 767) {
      this.xsView = false;
      $('#crowdsrc-nav-collapse-main').collapse('hide');
    } else { this.xsView = true; }
  }

  constructor(private _authService: AuthenticationService,
    private _imageService: ImageService,
    private _notificationService: NotificationService,
    private _router: Router) {

    _router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.page = _router.url.split('?')[0].replace(/\/$/, '');
      }
    });
  }

  ngOnInit() {
    // set xsView on load based on window width
    this.xsView = window.innerWidth > 767 ? false : true;

    this._authService.getCurrentUser().subscribe(
      user => {
        this.currentUser = user;
        if (user) {
          this._notificationService.setNotificationCount(user.notification_count);
          this.getUserImage();
        }
      });
  }

  private search(type?: string) {
    this.showSearchDropdown = false;
    this.search_bar.nativeElement.blur();

    const type_param = type ? '&type=' + type : '';
    this._router.navigateByUrl('/search?query=' + this.searchValue + type_param);
    this.searchValue = '';

    if (this.xsView) { $('#crowdsrc-nav-collapse-main').collapse('hide'); }
  }

  private getUserImage() {
    if (this.currentUser) {
      this._imageService.getUserImage(this.currentUser.username).subscribe(
        image => this.currentUser.image = image);
    }
  }

  private logout() {
    this._authService.logout();
  }
}
