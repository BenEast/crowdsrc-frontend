import { Injectable } from '@angular/core';
import { Notification } from 'app/models/notification';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { MapService } from 'app/services/map.service';
import { ConstantService } from 'app/services/constant.service';
import { AuthenticationService } from 'app/services/authentication.service';

@Injectable()
export class NotificationService {
  private notification_count = 0;

  constructor(private _authService: AuthenticationService,
    private _constantService: ConstantService,
    private _mapService: MapService,
    private _http: Http) { }

  getNotificationCount() {
    return this.notification_count;
  }
  setNotificationCount(value: number) {
    this.notification_count = value;
  }

  decNotificationCount() {
    if (this.notification_count > 0) {
      this.notification_count--;
    }
  }

  /* Get notifications API call */
  getNotifications(): Observable<Notification[]> {
    return this._http.get(this._constantService.getBaseUrl() + '/notifications/',
      this._authService.getHeaders()).map(this._mapService.mapNotifications);
  }
}
