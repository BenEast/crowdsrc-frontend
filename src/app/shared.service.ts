import { Injectable } from '@angular/core';
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs";
import { Comment } from "./comment/comment";
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { User } from "./user/user";
import { Project } from "./project/project";
import { Team } from './team/team';
import { TeamMessage } from './team/team.message';
import { TeamMember } from './team/team.member';
import { Task } from './team/task';
import 'rxjs/add/operator/map';

@Injectable()
export class SharedService {
  baseUrl = "http://localhost:8000";
  usersUrl = this.baseUrl + "/users/";
  commentsUrl = this.baseUrl + "/comments/";
  projectsUrl = this.baseUrl + "/projects/";
  contactUrl = this.baseUrl + "/contact/";
  tasksUrl = this.baseUrl + "/tasks/";
  teamMembersUrl = this.baseUrl + "/team-members/";
  teamMessagesUrl = this.baseUrl + "/team-messages/";

  constructor(private _http: Http) { }

  postTask(task_json) {
    return this._http.post(this.tasksUrl, task_json, { headers: this.getHeaders() });
  }

  deleteTask(id: number) {
    return this._http.delete(this.tasksUrl + id, { headers: this.getHeaders() });
  }

  postTeamMember(team_member_json) {
    return this._http.post(this.teamMembersUrl, team_member_json, { headers: this.getHeaders() });
  }

  deleteTeamMember(id: number) {
    return this._http.delete(this.teamMembersUrl + id, { headers: this.getHeaders() });
  }

  postTeamMessage(team_message_json) {
    return this._http.post(this.teamMessagesUrl, team_message_json, { headers: this.getHeaders() });
  }

  deleteTeamMessage(id: number) {
    return this._http.delete(this.teamMessagesUrl + id, { headers: this.getHeaders() });
  }

  postContact(contact_json) {
    return this._http.post(this.contactUrl, contact_json, { headers: this.getHeaders() });
  }

  // Comments API Calls
  getComments() {
    return this._http.get(this.commentsUrl, { headers: this.getHeaders() })
      .map(mapComments)
  }

  postComment(comment_json: string) {
    return this._http.post(this.commentsUrl, comment_json, { headers: this.getHeaders() });
  }

  deleteComment(id: number) {
    return this._http.delete(this.commentsUrl + id + '/', { headers: this.getHeaders() });
  }

  // Projects API Calls
  getProjects() {
    return this._http.get(this.projectsUrl, { headers: this.getHeaders() })
      .map(mapListProjects);
  }

  getProject(id: number) {
    return this._http.get(this.projectsUrl + id + '/', { headers: this.getHeaders() })
      .map(mapDetailedProject);
  }

  postProject(project_json: string) {
    return this._http.post(this.projectsUrl, project_json, { headers: this.getHeaders() });
  }

  deleteProject(id: number) {
    return this._http.delete(this.projectsUrl + id + '/', { headers: this.getHeaders() });
  }

  // Users API Calls
  getUsers() {
    return this._http.get(this.usersUrl, { headers: this.getHeaders() })
      .map(mapListUsers);
  }

  getUser(id: number) {
    return this._http.get(this.usersUrl + id + '/', { headers: this.getHeaders() })
      .map(mapDetailedUser);
  }

  postUser(user_json: string) {
    return this._http.post(this.usersUrl + 'new/', user_json, { headers: this.getHeaders() });
  }

  deleteUser(id: number) {
    return this._http.delete(this.usersUrl + id + '/', { headers: this.getHeaders() });
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

function mapComments(response: Response): Comment[] {
  return response.json().map(toComment);
}

function toComment(result: any): Comment {
  let comment = <Comment>({
    id: result.id,
    user: toListUser(result.user),
    project: toNestedListProject(result.project),
    body: result.comment_body,
    create_datetime: result.create_datetime,
  });
  return comment;
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
    first_name: result.first_name,
    last_name: result.last_name,
    date_joined: result.date_joined,
    last_login: result.last_login,
    bio: result.profile.bio,
    location: result.profile.location,
    birth_date: result.profile.birth_date,
    image_name: result.profile.image_name,
    projects: result.projects.map(toNestedListProject),
    comments: result.comments.map(toComment),
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
  });
  return project;
}

function toNestedListProject(result: any): Project {
  let project = <Project>({
    id: result.id,
    title: result.title,
    description: result.description,
    create_datetime: result.create_datetime,
    website: result.website,
    user: result.user,
    category: result.category,
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
    comments: result.comments.map(toComment),
    team: toTeam(result.team),
    tasks: result.tasks.map(toTask)
  });
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