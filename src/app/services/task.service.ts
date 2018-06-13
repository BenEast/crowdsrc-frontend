import { Injectable } from '@angular/core';
import { AuthenticationService } from 'app/services/authentication.service';
import { ConstantService } from 'app/services/constant.service';
import { Http, Response } from '@angular/http';
import { MapService } from 'app/services/map.service';
import { Observable } from 'rxjs/Observable';
import { Task, TaskSubmission } from 'app/models/task';

@Injectable()
export class TaskService {
    constructor(private _authService: AuthenticationService,
        private _constantService: ConstantService,
        private _http: Http,
        private _mapService: MapService) { }

    /* Project Task API Calls */
    postTask(task_json: string): Observable<Task> {
        return this._http.post(this._constantService.getTasksUrl(), task_json,
            this._authService.getHeaders()).map(this._mapService.mapTask);
    }

    updateTask(task_json: string, id: number): Observable<Task> {
        return this._http.patch(this._constantService.getTasksUrl() + id + '/', task_json,
            this._authService.getHeaders()).map(this._mapService.mapTask);
    }

    deleteTask(id: number): Observable<Response> {
        return this._http.delete(this._constantService.getTasksUrl() + id + '/', this._authService.getHeaders());
    }

    /* Task submission API calls */
    postTaskSubmission(task_id: number, submission: string): Observable<TaskSubmission> {
        return this._http.post(this._constantService.getTasksUrl() + task_id + '/submissions/',
            submission, this._authService.getHeaders()).map(this._mapService.mapTaskSubmission);
    }

    updateTaskSubmission(task_id: number, submission_id: number, json: string): Observable<TaskSubmission> {
        return this._http.patch(this._constantService.getTasksUrl() + task_id + '/submissions/' + submission_id + '/',
            json, this._authService.getHeaders()).map(this._mapService.mapTaskSubmission);
    }

    deleteTaskSubmission(task_id: number, submission_id: number): Observable<Response> {
        return this._http.delete(this._constantService.getTasksUrl() + task_id + '/submissions/' + submission_id + '/',
            this._authService.getHeaders());
    }

    /* Task submission file API calls */
    getFileData(file_id: number): Observable<Response> {
        return this._http.get(this._constantService.getSubmissionsUrl() + file_id + '/',
            this._authService.getHeaders());
    }

    deleteSubmissionFile(file_id: number): Observable<Response> {
        return this._http.delete(this._constantService.getSubmissionsUrl() + file_id + '/',
            this._authService.getHeaders());
    }

    /* Task submission review API calls */
    getReview(task_id: number, submission_id: number) {
        return this._http.get(this._constantService.getTasksUrl() + task_id + '/submissions/' + submission_id + '/',
            this._authService.getHeaders()).map(this._mapService.mapReview);
    }

    postReview(review_json: string): Observable<Response> {
        return this._http.post(this._constantService.getReviewsUrl(), review_json, this._authService.getHeaders());
    }

    /* Task save API calls */
    postTaskSave(task_id: number): Observable<Response> {
        return this._http.post(this._constantService.getTasksUrl() + task_id + '/save/', undefined, this._authService.getHeaders());
    }

    deleteTaskSave(task_id: number): Observable<Response> {
        return this._http.delete(this._constantService.getTasksUrl() + task_id + '/save/', this._authService.getHeaders());
    }
}
