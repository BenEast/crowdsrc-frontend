import { Component, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AuthenticationService } from 'app/services/authentication.service';
import { CrowdService } from 'app/services/crowd.service';
import { faFacebookSquare, faGooglePlus, faLinkedin, faTwitter } from '@fortawesome/fontawesome-free-brands'
import { faCopyright } from '@fortawesome/fontawesome-pro-regular';
import { faCircle } from '@fortawesome/fontawesome-pro-solid';
import fontawesome from '@fortawesome/fontawesome';
import { RouteService } from 'app/services/route.service';

fontawesome.library.add(faCircle);
fontawesome.library.add(faCopyright);
fontawesome.library.add(faFacebookSquare);
fontawesome.library.add(faGooglePlus);
fontawesome.library.add(faLinkedin);
fontawesome.library.add(faTwitter);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private _authService: AuthenticationService,
    private _crowdService: CrowdService,
    private _routeService: RouteService,
    private _router: Router, _title: Title
  ) {
    _authService.init();

    _router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        _title.setTitle(this.getTitle(_router.url));
      }
    });
  }

  private getTitle(url: string): string {
    // Split URL on /, ?, & and map params to Map<string, string>F
    const split_url = [];
    const params: Map<string, string> = new Map<string, string>();

    for (const piece of url.split(/\/|\?|\&/).filter(function (e) { if (e) { return e; } })) {
      if (piece.indexOf('=') > -1) {
        const split_piece = piece.split('=')
        params.set(split_piece[0], split_piece[1]);
      } else { split_url.push(piece); }
    }

    // Create title for cases
    switch (split_url[0]) {
      case 'account-deleted': return 'Account deleted | crowdSRC';
      case 'crowd':
        if (params.has('tab')) {
          return split_url[1] + ' | ' + capitalizeFirstLetter(params.get('tab'));
        } else { return split_url[1] + ' | Details'; }

      case 'src':
        if (params.has('tab')) {
          return 'Src | ' + capitalizeFirstLetter(params.get('tab')) + ' | crowdSRC';
        } else if (split_url[1] === 'create') {
          return 'Create | crowdSRC';
        } else { return 'Src | crowdSRC'; }

      case 'about': return 'About | crowdSRC';
      case 'contact': return 'Contact Us | crowdSRC';
      case 'dashboard': return 'Dashboard | crowdSRC';
      case 'forgot-password': return 'Forgot Password';
      case 'login': return 'Login | crowdSRC';
      case 'notifications': return 'Notifications | crowdSRC';
      case 'reset-password': return 'Reset Password';

      case 'search':
        if (params.has('type')) {
          return 'Search Results | ' + capitalizeFirstLetter(params.get('type'));
        } else { return 'Search Results'; }

      case 'settings':
        if (params.has('tab')) {
          return 'Settings | ' + capitalizeFirstLetter(params.get('tab'));
        } else { return 'Settings | Preferences'; }

      case 'verify': return 'Verify | crowdSRC';
      default: return 'crowdSRC';
    }
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
