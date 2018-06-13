import { Component, OnInit } from '@angular/core';
import { Notification } from 'app/models/notification';
import { ImageService } from 'app/services/image.service';
import { NotificationService } from 'app/services/notification.service';
import { AuthenticationService } from 'app/services/authentication.service';
import { User } from 'app/models/user';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  private currentUser: User;
  private notifications: Notification[] = [];

  constructor(private _authService: AuthenticationService,
    private _notificationService: NotificationService,
    private _imageService: ImageService) { }

  ngOnInit() {
    // Wait for currentUser to load before requesting
    this._authService.getCurrentUser().subscribe(user => {
      this.currentUser = user;

      this._notificationService.getNotifications().subscribe(
        notifications => {
          this.notifications = notifications;
          this.loadUserImages();
        });
    });
  }

  onMousedown(event, notification: Notification) {
    if (notification.is_new) {
      notification.is_new = false;
      this._notificationService.decNotificationCount();
    }
  }

  private loadUserImages() {
    const requested_users: string[] = [];

    for (const notification of this.notifications) {
      if (!notification.user) { continue; }

      const username = notification.user.username;
      if (requested_users.includes(username)) { continue; }

      requested_users.push(username);

      this._imageService.getUserImage(username, 'md').subscribe(
        image => assignImage(this.notifications, image, username));
    }
  }
}

function assignImage(notifications: Notification[], image: string, username: string) {
  for (const notification of notifications) {
    if (!notification.user) { continue; }
    if (notification.user.username === username) { notification.user.image = image; }
  }
}
