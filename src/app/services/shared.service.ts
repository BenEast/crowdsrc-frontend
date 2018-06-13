import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { AuthenticationService } from 'app/services/authentication.service';
import { ConstantService } from './constant.service';
import { MapService } from 'app/services/map.service';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { TeamMessageReply, TeamMessage } from '../models/team.message';

@Injectable()
export class SharedService {

  constructor(private _authService: AuthenticationService,
    private _constantService: ConstantService,
    private _http: Http,
    private _mapService: MapService) { }

  /* Search API Calls */
  search(query: string, page?: number) {
    const page_param = page ? '&page=' + page : '';
    return this._http.get(this._constantService.getBaseUrl() + '/search/?query=' + query
      + page_param, this._authService.getHeaders()).map(this._mapService.mapSearchResults);
  }

  searchUsers(query: string, page?: number) {
    const page_param = page ? '&page=' + page : '';
    return this._http.get(this._constantService.getUsersUrl() + '?search=' + query
      + page_param, this._authService.getHeaders()).map(this._mapService.mapSearchResults);
  }

  searchProjects(query: string, page?: number) {
    const page_param = page ? '&page=' + page : '';
    return this._http.get(this._constantService.getProjectsUrl() + '?search=' + query
      + page_param, this._authService.getHeaders()).map(this._mapService.mapSearchResults);
  }

  searchTasks(query: string, page?: number) {
    const page_param = page ? '&page=' + page : '';
    return this._http.get(this._constantService.getTasksUrl() + '?search=' + query
      + page_param, this._authService.getHeaders()).map(this._mapService.mapSearchResults);
  }

  /* Project Team Message API Calls */
  postTeamMessage(team_message_json: string): Observable<TeamMessage> {
    return this._http.post(this._constantService.getTeamMessagesUrl(), team_message_json,
      this._authService.getHeaders()).map(this._mapService.mapTeamMessage);
  }

  deleteTeamMessage(id: number): Observable<Response> {
    return this._http.delete(this._constantService.getTeamMessagesUrl() + id + '/', this._authService.getHeaders());
  }

  updateTeamMessage(team_message_json: string, id: number): Observable<TeamMessage> {
    return this._http.patch(this._constantService.getTeamMessagesUrl() + id + '/',
      team_message_json, this._authService.getHeaders()).map(this._mapService.mapTeamMessage);
  }

  /* Team Message Reply API Calls */
  postTeamMessageReply(message_id: number, message_json: string): Observable<TeamMessageReply> {
    return this._http.post(this._constantService.getTeamMessagesUrl() + message_id
      + '/replies/', message_json, this._authService.getHeaders()).map(this._mapService.mapTeamMessageReply);
  }

  updateTeamMessageReply(message_id: number, reply_id: number, message_json: string): Observable<TeamMessageReply> {
    return this._http.patch(this._constantService.getTeamMessagesUrl() + message_id
      + '/replies/' + reply_id + '/', message_json, this._authService.getHeaders()).map(this._mapService.mapTeamMessageReply);
  }

  deleteMessageReply(message_id: number, reply_id: number): Observable<Response> {
    return this._http.delete(this._constantService.getTeamMessagesUrl() + message_id + '/replies/' + reply_id + '/',
      this._authService.getHeaders());
  }

  /* Contact Form API Call */
  postContact(contact_json: string): Observable<Response> {
    return this._http.post(this._constantService.getContactUrl(), contact_json, this._authService.getHeaders());
  }
}
