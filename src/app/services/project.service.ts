import { Injectable } from '@angular/core';
import { AuthenticationService } from 'app/services/authentication.service';
import { ConstantService } from 'app/services/constant.service';
import { Http, Response } from '@angular/http';
import { MapService } from 'app/services/map.service';
import { Project, Category } from 'app/models/project';
import { Observable } from 'rxjs/Observable';
import { TeamMessage } from 'app/models/team.message';
import { Task } from 'app/models/task';

@Injectable()
export class ProjectService {
    constructor(private _authService: AuthenticationService,
        private _constantService: ConstantService,
        private _http: Http,
        private _mapService: MapService) { }

    /* Projects API Calls */
    getProjects(): Observable<Project[]> {
        const mapProject = this._mapService.mapProject;
        return this._http.get(this._constantService.getProjectsUrl(), this._authService.getHeaders())
            .map(function (r) { return r.json().map(mapProject) });
    }

    getProject(id: number): Observable<Project> {
        return this._http.get(this._constantService.getProjectsUrl() + id + '/', this._authService.getHeaders())
            .map(this._mapService.mapProject);
    }

    getProjectMessages(id: number): Observable<TeamMessage[]> {
        const mapTeamMessage = this._mapService.mapTeamMessage;
        return this._http.get(this._constantService.getProjectsUrl() + id + '/messages/', this._authService.getHeaders())
            .map(function (r) { return r.json().map(mapTeamMessage) });
    }

    getProjectTasks(id: number): Observable<Task[]> {
        const mapTask = this._mapService.mapTask;
        return this._http.get(this._constantService.getProjectsUrl() + id + '/tasks/', this._authService.getHeaders())
            .map(function (r) { return r.json().map(mapTask) });
    }

    postProject(project_json: string): Observable<Response> {
        return this._http.post(this._constantService.getProjectsUrl(), project_json,
            this._authService.getHeaders());
    }

    updateProject(id: number, project_json: string): Observable<Project> {
        return this._http.patch(this._constantService.getProjectsUrl() + id + '/', project_json,
            this._authService.getHeaders()).map(this._mapService.mapProject);
    }

    deleteProject(id: number): Observable<Response> {
        return this._http.delete(this._constantService.getProjectsUrl() + id + '/', this._authService.getHeaders());
    }

    /* Project categories API calls */
    postProjectCategory(project_id: number, category_name: string): Observable<Category> {
        return this._http.post(this._constantService.getProjectsUrl() + project_id + '/categories/' + category_name + '/',
            undefined, this._authService.getHeaders()).map(this._mapService.mapCategory);
    }

    deleteProjectCategory(project_id: number, category_name: string): Observable<Response> {
        return this._http.delete(this._constantService.getProjectsUrl() + project_id + '/categories/' + category_name + '/',
            this._authService.getHeaders());
    }
}
