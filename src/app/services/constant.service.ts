import { Injectable } from '@angular/core';

@Injectable()
export class ConstantService {
  private baseUrl = 'http://localhost:8000';
  private usersUrl = this.baseUrl + '/users/';
  private commentsUrl = this.baseUrl + '/comments/';
  private projectsUrl = this.baseUrl + '/projects/';
  private skillsUrl = this.baseUrl + '/skills/';
  private contactUrl = this.baseUrl + '/contact/';
  private tasksUrl = this.baseUrl + '/tasks/';
  private taskMembersUrl = this.baseUrl + '/task-members/';
  private teamMessagesUrl = this.baseUrl + '/team-messages/';
  private authenticationUrl = this.baseUrl + '/authenticate/';
  private refreshUrl = this.baseUrl + '/refresh-token/';
  private submissionsUrl = this.baseUrl + '/submissions/';
  private reviewsUrl = this.baseUrl + '/reviews/';
  private suggestionsUrl = this.baseUrl + '/suggest/';
  private settingsUrl = this.baseUrl + '/settings/';
  private crowdUrl = this.baseUrl + '/crowd/';

  constructor() { }

  getBaseUrl(): string {
    return this.baseUrl;
  }

  getCrowdUrl(): string {
    return this.crowdUrl;
  }

  getUsersUrl(): string {
    return this.usersUrl;
  }

  getCommentsUrl(): string {
    return this.commentsUrl;
  }

  getProjectsUrl(): string {
    return this.projectsUrl;
  }

  getSkillsUrl(): string {
    return this.skillsUrl;
  }

  getContactUrl(): string {
    return this.contactUrl;
  }

  getSubmissionsUrl(): string {
    return this.submissionsUrl;
  }

  getTasksUrl(): string {
    return this.tasksUrl;
  }

  getTaskMembersUrl(): string {
    return this.taskMembersUrl;
  }

  getTeamMessagesUrl(): string {
    return this.teamMessagesUrl;
  }

  getAuthenticationUrl(): string {
    return this.authenticationUrl;
  }

  getRefreshUrl(): string {
    return this.refreshUrl;
  }

  getReviewsUrl(): string {
    return this.reviewsUrl;
  }

  getSuggestionsUrl(): string {
    return this.suggestionsUrl;
  }

  getSettingsUrl(): string {
    return this.settingsUrl;
  }
}
