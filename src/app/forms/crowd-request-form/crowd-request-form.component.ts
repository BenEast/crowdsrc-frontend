import { Component, OnInit, Input } from '@angular/core';
import { CrowdService } from 'app/services/crowd.service';
import { faUserPlus, faUserTimes } from '@fortawesome/fontawesome-pro-regular';
import fontawesome from '@fortawesome/fontawesome';

fontawesome.library.add(faUserPlus);
fontawesome.library.add(faUserTimes);

declare var $: any;

@Component({
  selector: 'app-crowd-request-form',
  templateUrl: './crowd-request-form.component.html',
  styleUrls: ['./crowd-request-form.component.css']
})
export class CrowdRequestFormComponent implements OnInit {
  @Input() receiverUsername: string;
  @Input() inCrowd: boolean;

  constructor(private _crowdService: CrowdService) { }
  ngOnInit() { }

  private sendRequest() {
    this._crowdService.postCrowdRequest(this.receiverUsername).subscribe(
      success => this.inCrowd = true);
  }

  private removeUser() {
    this._crowdService.deleteCrowdRequest(this.receiverUsername).subscribe(
      success => this.inCrowd = false);
  }

  private toggleConfirm(show: boolean) {
    const username = this.receiverUsername;
    if (show) {
      $('.fa-user-times').fadeOut(400,
        function () {
          $('#removeConfirm' + username).hide().removeClass('hidden').fadeIn();
        });
    } else {
      $('#removeConfirm' + username).fadeOut(400,
        function () { $('.fa-user-times').fadeIn(); });
    }
  }
}
