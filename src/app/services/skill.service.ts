import { Injectable } from '@angular/core';
import { AuthenticationService } from 'app/services/authentication.service';
import { ConstantService } from 'app/services/constant.service';
import { Http, Response } from '@angular/http';
import { MapService } from 'app/services/map.service';
import { Observable } from 'rxjs/Observable';
import { Skill } from 'app/models/skill';

@Injectable()
export class SkillService {
    constructor(private _authService: AuthenticationService,
        private _constantService: ConstantService,
        private _http: Http,
        private _mapService: MapService) { }

    getSkillDetail(skill_name: string) {
        return this._http.get(this._constantService.getSkillsUrl() + skill_name + '/',
            this._authService.getHeaders()).map(this._mapService.mapSkillDetail);
    }

    postUserSkill(skill_name: string): Observable<Skill> {
        return this._http.post(this._constantService.getUsersUrl() + 'skills/' + skill_name + '/',
            undefined, this._authService.getHeaders()).map(this._mapService.mapSkill);
    }

    deleteUserSkill(skill_name: string): Observable<Response> {
        return this._http.delete(this._constantService.getUsersUrl() + 'skills/' + skill_name + '/',
            this._authService.getHeaders());
    }

    postTaskSkill(task_id: number, skill_name: string): Observable<Skill> {
        return this._http.post(this._constantService.getTasksUrl() + task_id + '/skills/' + skill_name + '/',
            undefined, this._authService.getHeaders()).map(this._mapService.mapSkill);
    }

    deleteTaskSkill(task_id: number, skill_name: string): Observable<Response> {
        return this._http.delete(this._constantService.getTasksUrl() + task_id + '/skills/' + skill_name + '/',
            this._authService.getHeaders());
    }
}
