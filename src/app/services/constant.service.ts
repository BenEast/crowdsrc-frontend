import { Injectable } from '@angular/core';

@Injectable()
export class ConstantService {
  constructor() { }

  private baseUrl = "http://localhost:8000";
  private usersUrl = this.baseUrl + "/users/";
  private commentsUrl = this.baseUrl + "/comments/";
  private profilesUrl = this.baseUrl + "/profiles/";
  private projectsUrl = this.baseUrl + "/projects/";
  private contactUrl = this.baseUrl + "/contact/";
  private tasksUrl = this.baseUrl + "/tasks/";
  private teamMembersUrl = this.baseUrl + "/team-members/";
  private teamMessagesUrl = this.baseUrl + "/team-messages/";
  private authenticationUrl = 'http://localhost:8000/authenticate/'
  private validateTokenUrl = 'http://localhost:8000/validate-token/'

  getBaseUrl() {
    return this.baseUrl;
  }

  getUsersUrl() {
    return this.usersUrl;
  }

  getCommentsUrl() {
    return this.commentsUrl;
  }

  getProfilesUrl() {
    return this.profilesUrl;
  }

  getProjectsUrl() {
    return this.projectsUrl;
  }

  getContactUrl() {
    return this.contactUrl;
  }

  getTasksUrl() {
    return this.tasksUrl;
  }

  getTeamMembersUrl() {
    return this.teamMembersUrl;
  }

  getTeamMessagesUrl() {
    return this.teamMessagesUrl;
  }

  getAuthenticationUrl() {
    return this.authenticationUrl;
  }

  getValidationUrl() {
    return this.validateTokenUrl;
  }
}

