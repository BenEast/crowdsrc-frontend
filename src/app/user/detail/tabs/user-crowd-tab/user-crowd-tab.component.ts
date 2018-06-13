import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from 'app/services/authentication.service';
import { CrowdService } from 'app/services/crowd.service';
import { User } from 'app/models/user';
import { faCheck, faTimes } from '@fortawesome/fontawesome-pro-solid';
import fontawesome from '@fortawesome/fontawesome';

fontawesome.library.add(faCheck);
fontawesome.library.add(faTimes);

@Component({
  selector: 'app-user-crowd-tab',
  templateUrl: './user-crowd-tab.component.html',
  styleUrls: ['./user-crowd-tab.component.css']
})
export class UserCrowdTabComponent implements OnInit {
  @Input() user: User;

  private currentUser: User;
  private crowd: User[];
  private pending: User[];
  private received: any[];

  private loading = true;

  constructor(private _authService: AuthenticationService,
    private _crowdService: CrowdService) { }

  ngOnInit() {
    this._authService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
      if (!this.crowd) {
        this.getCrowd();
      }
    });
  }

  private onRequestView(index: number) {
    this.received[index].is_viewed = true;
    this._crowdService.viewedCrowdRequest(this.received[index].sender.username).subscribe(success => { });
  }

  private respond(accepted: boolean, index: number) {
    const sender = this.received[index].sender;

    this._crowdService.updateCrowdRequest(sender.username, accepted).subscribe(
      success => {
        // If accepted, add the sender to crowd and sort by username
        if (accepted && this.currentUser) {
          this.crowd.push(sender);
          this.crowd.sort(function (a, b): number {
            if (a.username < b.username) { return -1; }
            if (a.username > b.username) { return 1; }
            return 0;
          });
        }
        this.received.splice(index, 1);
        this.currentUser.crowd_requests -= 1;
      });
  }

  private getCrowd() {
    this._crowdService.getUserCrowd(this.user.username).subscribe(
      result => {
        this.crowd = result.crowd;
        this.pending = result.pending;
        this.received = result.received;
        this.loading = false;
      });
  }
}
