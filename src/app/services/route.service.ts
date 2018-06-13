import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Injectable()
export class RouteService {
  private previous_route = '';
  private current_route = '';

  constructor(private _router: Router) {
    _router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.previous_route = this.current_route;
        this.current_route = _router.url;
      }
    });
  }

  addQueryParam(name: string, value: any) {
    if (this.current_route.indexOf('?') > -1) {
      this.current_route += '&' + name + '=' + value;
    } else {
      this.current_route += '?' + name + '=' + value;
    }
  }

  getCurrentRoute() {
    return this.current_route;
  }

  getPreviousRoute() {
    return this.previous_route;
  }
}
