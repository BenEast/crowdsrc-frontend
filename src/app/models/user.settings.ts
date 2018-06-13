import { User } from './user';
import { Skill } from 'app/models/skill';

export class UserSettings {
    preferences: UserPreferences;
    privacy: UserPrivacySettings;

    constructor(preferences: UserPreferences,
        privacy: UserPrivacySettings) {
        this.preferences = preferences;
        this.privacy = privacy;
    }
}

export class UserPreferences {
    skill_preferences: Skill[];

    notify_crowd_request_accept: boolean;
    notify_message_replies: boolean;
    notify_project_messages: boolean;
    notify_project_submissions: boolean;
    notify_saved_task_status: boolean;
    notify_submission_status: boolean;

    constructor(skill_preferences: Skill[],
        notify_crowd_request_accept: boolean,
        notify_message_replies: boolean,
        notify_project_messages: boolean,
        notify_project_submissions: boolean,
        notify_saved_task_status: boolean,
        notify_submission_status: boolean
    ) {
        this.skill_preferences = skill_preferences;
        this.notify_crowd_request_accept = notify_crowd_request_accept;
        this.notify_message_replies = notify_message_replies;
        this.notify_project_messages = notify_project_messages;
        this.notify_project_submissions = notify_project_submissions;
        this.notify_saved_task_status = notify_saved_task_status;
        this.notify_submission_status = notify_submission_status;
    }
}

export class BlockedUser {
    id: number;
    target: User;
    created: Date;

    constructor(id: number,
        target: User,
        created: Date) {

        this.id = id;
        this.target = target;
        this.created = created;
    }
}

export class UserPrivacySettings {
    blocked_users: BlockedUser[];

    allow_email_search: boolean;
    allow_loc_search: boolean;
    allow_name_search: boolean;
    allow_username_search: boolean;

    view_activity_level: string;
    view_age_level: string;
    view_email_level: string;
    view_crowd_level: string;
    view_stats_level: string;

    constructor(
        blocked_users: BlockedUser[],

        allow_email_search: boolean,
        allow_loc_search: boolean,
        allow_name_search: boolean,
        allow_username_search: boolean,

        view_activity_level: string,
        view_age_level: string,
        view_email_level: string,
        view_crowd_level: string,
        view_stats_level: string,
    ) {
        this.blocked_users = blocked_users;

        this.allow_email_search = allow_email_search;
        this.allow_loc_search = allow_loc_search;
        this.allow_name_search = allow_name_search;
        this.allow_username_search = allow_username_search;

        this.view_activity_level = view_activity_level;
        this.view_age_level = view_age_level;
        this.view_email_level = view_email_level;
        this.view_crowd_level = view_crowd_level;
        this.view_stats_level = view_stats_level;
    }
}
