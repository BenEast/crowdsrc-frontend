import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { AuthenticationService } from 'app/services/authentication.service';
import { ConstantService } from 'app/services/constant.service';
import { MapService } from 'app/services/map.service';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';
import { User } from 'app/models/user';

@Injectable()
export class CrowdService {
  constructor(private _authService: AuthenticationService,
    private _constantService: ConstantService,
    private _mapService: MapService,
    private _http: Http) { }

  getUserCrowd(username: string): Observable<any> {
    return this._http.get(this._constantService.getUsersUrl() + username + '/crowd/',
      this._authService.getHeaders()).map(this._mapService.mapUserCrowd);
  }

  postCrowdRequest(username: string): Observable<Response> {
    return this._http.post(this._constantService.getCrowdUrl() + username + '/',
      undefined, this._authService.getHeaders());
  }

  deleteCrowdRequest(username: string): Observable<Response> {
    return this._http.delete(this._constantService.getCrowdUrl() + username + '/',
      this._authService.getHeaders());
  }

  viewedCrowdRequest(username): Observable<Response> {
    return this._http.patch(this._constantService.getCrowdUrl() + username + '/response/', undefined, this._authService.getHeaders());
  }

  updateCrowdRequest(username: string, accepted: boolean): Observable<Response> {
    const response: string = accepted ? JSON.stringify({ is_accepted: true }) : JSON.stringify({ is_rejected: true });

    return this._http.patch(this._constantService.getCrowdUrl() + username + '/response/',
      response, this._authService.getHeaders());
  }
}
