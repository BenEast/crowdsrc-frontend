import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { RouteService } from '../services/route.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private showLogin = true;
  private changedPassword = false;
  private previous = '';

  constructor(private _authenticationService: AuthenticationService,
    private _activatedRoute: ActivatedRoute,
    private _routeService: RouteService) { }

  ngOnInit() {
    this._activatedRoute.queryParams.subscribe(params => {
      let view = params['view'];
      if (view) { view = view.toLowerCase(); }
      if (view === 'register') { this.showLogin = false }
    });

    if (this._routeService.getPreviousRoute() === '/settings?tab=account&updated-password=true') {
      this.changedPassword = true;
    }
  }

  private logout() {
    this._authenticationService.logout();
  }
}
