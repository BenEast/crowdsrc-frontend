import { Component, OnInit, Input } from '@angular/core';
import { UserPreferences } from 'app/models/user.settings';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-user-notifications-form',
  templateUrl: './user-notifications-form.component.html',
  styleUrls: ['./user-notifications-form.component.css']
})
export class UserNotificationsFormComponent implements OnInit {
  @Input() preferences: UserPreferences;
  @Input() editNotifications: boolean;

  constructor(private _userService: UserService) { }
  ngOnInit() { }

  private submitNotifications() {
    const notifications_json = JSON.stringify({
      notify_crowd_request_accept: this.preferences.notify_crowd_request_accept,
      notify_message_replies: this.preferences.notify_message_replies,
      notify_project_messages: this.preferences.notify_project_messages,
      notify_project_submissions: this.preferences.notify_project_submissions,
      notify_saved_task_status: this.preferences.notify_saved_task_status,
      notify_submission_status: this.preferences.notify_submission_status,
    });

    this._userService.updatePreferencesSettings(notifications_json, 'notifications').subscribe(success => { });
  }
}
