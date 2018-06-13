import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'app/models/user';
import { AuthenticationService } from 'app/services/authentication.service';

@Component({
  selector: 'app-account-deleted',
  templateUrl: './account-deleted.component.html',
  styleUrls: ['./account-deleted.component.css']
})
export class AccountDeletedComponent implements OnInit {
  private loading = true;

  constructor(private _authService: AuthenticationService,
    private _router: Router) { }

  ngOnInit() {
    this._authService.getCurrentUser().subscribe(
      user => {
        // Navigate away from this page if a user is logged in
        if (user) { this._router.navigate(['/']) } else { this.loading = false; }
      });
  }
}
