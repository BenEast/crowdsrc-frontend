import { Injectable } from '@angular/core';
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs";
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { User } from "../models/user";
import { Project } from "../models/project";
import { Team } from '../models/team';
import { TeamMessage } from '../models/team.message';
import { TeamMember } from '../models/team.member';
import { Task } from '../models/task';
import { ConstantService } from './constant.service';
import 'rxjs/add/operator/map';

@Injectable()
export class SharedService {

  constructor(private _constantService: ConstantService, private _http: Http) { }

  postTask(task_json) {
    return this._http.post(this._constantService.getTasksUrl(), task_json, { headers: this.getHeaders() });
  }

  deleteTask(id: number) {
    return this._http.delete(this._constantService.getTasksUrl() + id + '/', { headers: this.getHeaders() });
  }

  postTeamMember(team_member_json) {
    return this._http.post(this._constantService.getTeamMembersUrl(), team_member_json, { headers: this.getHeaders() });
  }

  deleteTeamMember(id: number) {
    return this._http.delete(this._constantService.getTeamMembersUrl() + id + '/', { headers: this.getHeaders() });
  }

  postTeamMessage(team_message_json) {
    return this._http.post(this._constantService.getTeamMessagesUrl(), team_message_json, { headers: this.getHeaders() });
  }

  deleteTeamMessage(id: number) {
    return this._http.delete(this._constantService.getTeamMessagesUrl() + id + '/', { headers: this.getHeaders() });
  }

  postContact(contact_json) {
    return this._http.post(this._constantService.getContactUrl(), contact_json, { headers: this.getHeaders() });
  }

  // Projects API Calls
  getProjects() {
    return this._http.get(this._constantService.getProjectsUrl(), { headers: this.getHeaders() })
      .map(mapListProjects);
  }

  getProject(id: number) {
    return this._http.get(this._constantService.getProjectsUrl() + id + '/', { headers: this.getHeaders() })
      .map(mapDetailedProject);
  }

  postProject(project_json: string) {
    return this._http.post(this._constantService.getProjectsUrl(), project_json, { headers: this.getHeaders() });
  }

  deleteProject(id: number) {
    return this._http.delete(this._constantService.getProjectsUrl() + id + '/', { headers: this.getHeaders() });
  }

  // Users API Calls
  getUsers() {
    return this._http.get(this._constantService.getUsersUrl(), { headers: this.getHeaders() })
      .map(mapListUsers);
  }

  getUser(id: number) {
    return this._http.get(this._constantService.getUsersUrl() + id + '/', { headers: this.getHeaders() })
      .map(mapDetailedUser);
  }

  postUser(user_json: string) {
    return this._http.post(this._constantService.getUsersUrl() + 'new/', user_json, { headers: this.getHeaders() });
  }

  deleteUser(id: number) {
    return this._http.delete(this._constantService.getUsersUrl() + id + '/', { headers: this.getHeaders() });
  }

  // Profiles API Calls
  updateProfile(id: number, profile_json: string) {
    return this._http.put(this._constantService.getProfilesUrl() + 'update/' + id + '/', { headers: this.getHeaders() });
  }

  // Function to generate common headers
  private getHeaders() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let token = Cookie.get('crowdsrc');
    if (token) {
      headers.append('Authorization', 'Token ' + token);
    }
    return headers;
  }
}

function mapListUsers(response: Response): User[] {
  return response.json().map(toListUser);
}

function toListUser(result: any): User {
  let user = <User>({
    id: result.id,
    username: result.username,
    email: result.email,
    date_joined: result.date_joined,
  });
  return user;
}

function mapDetailedUser(response: Response): User {
  return toDetailedUser(response.json());
}

function toDetailedUser(result: any): User {
  let user = <User>({
    id: result.id,
    username: result.username,
    email: result.email,
    name: result.first_name + " " + result.last_name,
    date_joined: result.date_joined,
    last_login: result.last_login,
    bio: result.profile.bio,
    location: result.profile.location,
    birth_date: result.profile.birth_date,
    image_name: result.profile.image_name,
    projects: result.projects.map(toNestedListProject),
  });
  return user;
}

function mapListProjects(response: Response): Project[] {
  return response.json().map(toListProject);
}

function toListProject(result: any): Project {
  let project = <Project>({
    id: result.id,
    title: result.title,
    description: result.description,
    create_datetime: result.create_datetime,
    website: result.website,
    user: toListUser(result.user),
    category: result.category,
    team_member_count: result.team.member_count,
    task_count: result.task_count,
  });
  return project;
}

function toNestedListProject(result: any): Project {
  let member_count;
  if (result.team) {
    member_count = result.team.member_count;
  } else {
    member_count = 0;
  }
  let project = <Project>({
    id: result.id,
    title: result.title,
    description: result.description,
    create_datetime: result.create_datetime,
    website: result.website,
    user: result.user,
    category: result.category,
    team_member_count: member_count,
    task_count: result.task_count,
  });
  return project;
}

function mapDetailedProject(response: Response): Project {
  return toDetailedProject(response.json());
}

function toDetailedProject(result: any): Project {
  let project = <Project>({
    id: result.id,
    title: result.title,
    description: result.description,
    create_datetime: result.create_datetime,
    website: result.website,
    user: result.user,
    category: result.category,
    team: toTeam(result.team),
    tasks: result.tasks.map(toTask),
    team_member_count: result.team.members.length,
    task_count: result.tasks.length,
  });
  console.log(project)
  return project;
}

function toTeam(result: any): Team {
  let team = <Team>({
    id: result.id,
    members: result.members.map(toTeamMember),
    messages: result.messages.map(toTeamMessage),
    is_public: result.is_public
  });
  return team;
}

function toTeamMember(result: any): TeamMember {
  let teamMember = <TeamMember>({
    id: result.id,
    role: result.role,
    username: result.user.username,
    user_id: result.user.id
  });
  return teamMember;
}

function toTeamMessage(result: any): TeamMessage {
  let teamMessage = <TeamMessage>({
    id: result.id,
    user: toListUser(result.user),
    body: result.body,
    create_datetime: result.create_datetime,
    is_public: result.is_public
  });
  return teamMessage;
}

function toTask(result: any): Task {
  let task = <Task>({
    id: result.id,
    title: result.title,
    description: result.description,
    status: result.status,
    last_updated: result.last_updated,
    skills: result.skills,
    members: result.members.map(toTaskMember),
    is_public: result.is_public
  });
  return task;
}

function toTaskMember(result: any): TeamMember {
  let member = <TeamMember>({
    id: result.id,
    role: result.member.role,
    username: result.member.user.username,
    user_id: result.member.user.id
  });
  return member;
}