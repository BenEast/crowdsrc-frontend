import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { User } from 'app/models/user';
import { UserSettings, BlockedUser, UserPreferences, UserPrivacySettings } from 'app/models/user.settings';
import { Category, Project } from 'app/models/project';
import { Skill } from 'app/models/skill';
import { Task, TaskSubmission, SubmissionFile } from 'app/models/task';
import { TeamMessageReply, TeamMessage } from 'app/models/team.message';
import { Notification } from '../models/notification';


/* A service to map responses to data types */
@Injectable()
export class MapService {
    constructor() { }

    mapUserCrowd(response: Response) {
        const result_json = response.json();
        return {
            crowd: result_json.crowd.map(toUser),
            pending: result_json.pending.map(toUser),
            received: result_json.received.map(function (r) {
                return {
                    is_viewed: r.is_viewed,
                    sender: toUser(r.sender)
                };
            }),
        };
    }

    mapCategory(response: Response | object): Category {
        if (response instanceof Response) { return toCategory(response.json()); }
        return toCategory(response);
    }

    mapProject(response: Response | object): Project {
        if (response instanceof Response) { return toProject(response.json()); }
        return toProject(response);
    }

    mapSearchResults(response: Response | object) {
        if (response instanceof Response) { return toSearchResults(response.json()); }
        return toSearchResults(response);
    }

    mapSkill(response: Response | object): Skill {
        if (response instanceof Response) { return toSkill(response.json()); }
        return toSkill(response);
    }

    mapSkillDetail(response: Response | object) {
        if (response instanceof Response) { return toSkillDetail(response.json()); }
        return toSkillDetail(response);
    }

    mapTask(response: Response | object): Task {
        if (response instanceof Response) { return toTask(response.json()); }
        return toTask(response);
    }

    mapTaskSubmission(response: Response | object): TaskSubmission {
        if (response instanceof Response) { return toTaskSubmission(response.json()); }
        return toTaskSubmission(response);
    }

    mapTeamMessage(response: Response | object): TeamMessage {
        if (response instanceof Response) { return toTeamMessage(response.json()); }
        return toTeamMessage(response);
    }

    mapTeamMessageReply(response: Response | object): TeamMessageReply {
        if (response instanceof Response) { return toTeamMessageReply(response.json()); }
        return toTeamMessageReply(response);
    }

    mapUser(response: Response | object): User {
        if (response instanceof Response) { return toUser(response.json()); }
        return toUser(response);
    }

    mapUserSettings(response: Response | object): UserSettings {
        if (response instanceof Response) { return toUserSettings(response.json()); }
        return toUserSettings(response);
    }

    mapBlockedUser(response: Response | object): BlockedUser {
        if (response instanceof Response) { return toBlockedUser(response.json()); }
        return toBlockedUser(response);
    }

    mapReview(response: Response) {
        const result = response.json();
        return {
            task: toTask(result.task),
            submission: toTaskSubmission(result.submission),
        };
    }

    mapNotifications(response: Response | object[]) {
        if (response instanceof Response) {
            return response.json().notifications.map(toNotification);
        }
        return response.map(toNotification);
    }
}

function toNotification(result: any): Notification {
    return new Notification(new Date(result.datetime), result.message, result.relative_url,
        result.user ? toUser(result.user) : undefined, result.is_new);
}

function handleResults(result: any) {
    if (result.username) {
        return toUser(result);
    } else if (result.status !== undefined) {
        return toTask(result);
    } else if (result.categories !== undefined) {
        return toProject(result);
    }
    // if it's not any of the above, just return the json
    return result;
}

function toCategory(result: any): Category {
    return new Category(result.name);
}

function toProject(result: any): Project {
    return new Project(
        // Required Fields
        result.id,
        result.title,
        toUser(result.user),
        result.categories.map(toCategory),
        result.description,
        result.created,
        result.last_updated,
        result.task_count,
        result.message_count,
        // Optional Fields
        result.website,
        result.messages ? result.messages.map(toTeamMessage) : [],
        result.tasks ? result.tasks.map(toTask) : [],
        result.skills ? result.skills : [],
    );
}

// Look into integrating this with the Skill model
// solidify what data we actually want first.
function toSkillDetail(result: any) {
    return {
        project_count: result.project_count,
        user_count: result.user_count,
        task_count: result.task_count,
        user_has_skill: result.user_has_skill,
        top_projects: result.top_projects.map(toProject),
        top_users: result.top_users.map(toUser),
    };
}


function toSearchResults(result: any) {
    return {
        count: result.count,
        page: result.page,
        results: result.results.map(handleResults),
    };
}

function toUser(result: any): User {
    if (result.profile) {
        return new User(
            // Required Fields
            result.id,
            result.username,
            result.in_crowd,
            result.show_stats,
            result.show_crowd,
            // Optional Fields
            result.email,
            result.first_name,
            result.last_name,
            result.date_joined,
            result.last_login,
            result.projects ? result.projects.map(toProject) : [],
            result.profile.id,
            result.profile.bio,
            result.profile.location,
            result.profile.birth_date,
            result.profile.image,
            result.skills.map(toSkill),
            result.profile.created,
            result.profile.last_updated,
            result.settings ? toUserSettings(result.settings) : undefined,
            result.saved_tasks.map(function (e) { return toTask(e.task); }),
        );
    } else {
        return new User(
            // Required Fields
            result.id,
            result.username,
            result.in_crowd,
            result.show_stats,
            result.show_crowd,
            // Optional Fields
            result.email,
            result.first_name,
            result.last_name,
            result.date_joined,
            result.last_login,
            result.projects ? result.projects.map(toProject) : [],
            -1,
            '',
            result.location
        );
    }
}

function toUserSettings(result: any): UserSettings {
    return new UserSettings(
        toUserPreferences(result.preferences),
        toUserPrivacySettings(result.privacy)
    );
}

function toUserPreferences(result: any): UserPreferences {
    return new UserPreferences(
        result.skill_preferences.map(toSkill),
        result.notify_crowd_request_accept,
        result.notify_message_replies,
        result.notify_project_messages,
        result.notify_project_submissions,
        result.notify_saved_task_status,
        result.notify_submission_status
    );
}

function toUserPrivacySettings(result: any): UserPrivacySettings {
    return new UserPrivacySettings(
        result.blocked_users.map(toBlockedUser),
        result.allow_email_search,
        result.allow_loc_search,
        result.allow_name_search,
        result.allow_username_search,
        result.view_activity_level,
        result.view_age_level,
        result.view_email_level,
        result.view_crowd_level,
        result.view_stats_level,
    );
}

function toBlockedUser(result: any): BlockedUser {
    return new BlockedUser(result.id,
        toUser(result.target),
        result.created);
}

function toSkill(result: any): Skill {
    return new Skill(result.skill.name, result.rating, result.is_preferred);
}

function toTask(result: any): Task {
    return new Task(
        // Required Fields
        result.id,
        result.title,
        result.description,
        new Date(result.created),
        new Date(result.last_updated),
        result.status,
        result.is_saved,
        result.skills.map(toSkill),
        result.submissions ? result.submissions.map(toTaskSubmission) : [],
    );
}

function toTaskSubmission(result: any): TaskSubmission {
    return new TaskSubmission(
        result.id,
        result.user_id,
        result.last_updated,
        result.is_accepted,
        result.files.map(toSubmissionFile)
    );
}

function toSubmissionFile(result: any): SubmissionFile {
    return new SubmissionFile(
        result.id,
        result.filename,
        result.size,
        result.data
    );
}

function toTeamMessage(result: any): TeamMessage {
    return new TeamMessage(
        // Required Fields
        result.id,
        toUser(result.user),
        result.body,
        result.created,
        result.last_updated,
        result.replies ? result.replies.map(toTeamMessageReply) : [],
    );
}

function toTeamMessageReply(result: any): TeamMessageReply {
    return new TeamMessageReply(
        result.id,
        toUser(result.user),
        result.body,
        result.last_updated);
}
