import { Injectable } from '@angular/core';
import { AuthenticationService } from 'app/services/authentication.service';
import { ConstantService } from 'app/services/constant.service';
import { MapService } from 'app/services/map.service';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BlockedUser, UserSettings } from 'app/models/user.settings';
import { Project } from 'app/models/project';
import { User } from 'app/models/user';
import { Notification } from 'app/models/notification';

@Injectable()
export class UserService {
    constructor(private _authService: AuthenticationService,
        private _constantService: ConstantService,
        private _http: Http,
        private _mapService: MapService) { }

    /* Blocked user API Calls */
    postBlockedUser(target_username: string): Observable<BlockedUser> {
        return this._http.post(this._constantService.getUsersUrl() + target_username + '/block/',
            undefined, this._authService.getHeaders()).map(this._mapService.mapBlockedUser);
    }

    deleteBlockedUser(target_username: string): Observable<Response> {
        return this._http.delete(this._constantService.getUsersUrl() + target_username + '/block/',
            this._authService.getHeaders());
    }

    /* Users API Calls */
    getUser(username: string): Observable<User> {
        return this._http.get(this._constantService.getUsersUrl() + username + '/',
            this._authService.getHeaders()).map(this._mapService.mapUser);
    }

    updateUser(username: string, profile_json: string): Observable<User> {
        return this._http.patch(this._constantService.getUsersUrl() + username + '/',
            profile_json, this._authService.getHeaders()).map(this._mapService.mapUser);
    }

    getUserSettings(): Observable<UserSettings> {
        return this._http.get(this._constantService.getSettingsUrl() + 'users/',
            this._authService.getHeaders()).map(this._mapService.mapUserSettings);
    }

    /* Suggestions API Calls */
    getTaskSuggestions(): Observable<Response> {
        return this._http.get(this._constantService.getSuggestionsUrl() + 'tasks/',
            this._authService.getHeaders());
    }

    getReviewSuggestions(): Observable<Response> {
        return this._http.get(this._constantService.getSuggestionsUrl() + 'reviews/',
            this._authService.getHeaders());
    }

    /* Settings API Calls */
    updatePrivacySettings(settings_json: string, section: string): Observable<Response> {
        return this._http.patch(this._constantService.getSettingsUrl() + 'users/privacy/?section=' + section,
            settings_json, this._authService.getHeaders());
    }
    updatePreferencesSettings(settings_json: string, section: string): Observable<Response> {
        return this._http.patch(this._constantService.getSettingsUrl() + 'users/preferences/?section=' + section,
            settings_json, this._authService.getHeaders());
    }

    /* Delete User API Call */
    deleteUserAccount(delete_json: string): Observable<Response> {
        return this._http.post(this._constantService.getBaseUrl() + '/delete/user/', delete_json, this._authService.getHeaders());
    }

    /* Stats API Call */
    getUserStats(username: string): Observable<Response> {
        return this._http.get(this._constantService.getUsersUrl() + username + '/stats/', this._authService.getHeaders());
    }
}
