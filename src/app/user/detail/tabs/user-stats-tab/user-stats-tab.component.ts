import { Component, OnInit, Input } from '@angular/core';
import { User } from 'app/models/user';
import { UserService } from 'app/services/user.service';
import { AuthenticationService } from 'app/services/authentication.service';
import * as d3 from 'd3';

@Component({
  selector: 'app-user-stats-tab',
  templateUrl: './user-stats-tab.component.html',
  styleUrls: ['./user-stats-tab.component.css']
})
export class UserStatsTabComponent implements OnInit {
  @Input() user: User;

  private loading = true;
  private stats: any;

  constructor(private _authService: AuthenticationService,
    private _userService: UserService) { }

  ngOnInit() {
    this._authService.getCurrentUser().subscribe(user => {
      this.getUserStats();
    });
  }

  private getUserStats() {
    this._userService.getUserStats(this.user.username).subscribe(
      stats => {
        this.stats = stats.json();
        this.renderGraph();
        this.loading = false;
      });
  }

  private renderGraph() {
    // https://www.pshrmn.com/tutorials/d3/bar-charts/
  }
}
