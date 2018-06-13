import { Project } from './project';
import { Skill } from './skill';
import { UserSettings } from './user.settings';
import { Task } from './task';
import { Notification } from './notification';

export class User {
    id: number;
    username: string;
    in_crowd: boolean;
    show_stats: boolean;
    show_crowd: boolean;

    email?: string;
    first_name?: string;
    last_name?: string;
    date_joined?: string;
    last_login?: string;
    projects?: Project[];

    profile_id?: number;
    bio?: string;
    location?: string;
    birth_date?: string;

    image?: string;
    skills?: Skill[];
    created?: string;
    last_updated?: string;
    settings?: UserSettings;
    saved_tasks?: Task[];
    crowd_requests?: number;
    notification_count?: number;

    constructor(
        id: number,
        username: string,
        in_crowd: boolean,
        show_stats?: boolean,
        show_crowd?: boolean,
        email?: string,
        first_name?: string,
        last_name?: string,
        date_joined?: string,
        last_login?: string,
        projects?: Project[],
        profile_id?: number,
        bio?: string,
        location?: string,
        birth_date?: string,
        image?: string,
        skills?: Skill[],
        created?: string,
        last_updated?: string,
        settings?: UserSettings,
        saved_tasks?: Task[],
        crowd_requests?: number,
        notification_count?: number,
    ) {
        // Required fields
        this.id = id;
        this.username = username;
        this.in_crowd = in_crowd;

        // Optional fields
        this.show_stats = show_stats;
        this.show_crowd = show_crowd;
        this.email = email === undefined ? '' : email;
        this.first_name = first_name === undefined ? '' : first_name;
        this.last_name = last_name === undefined ? '' : last_name;
        this.date_joined = date_joined === undefined ? '' : date_joined;
        this.last_login = last_login === undefined ? '' : last_login;

        this.projects = projects === undefined ? [] : projects;

        this.profile_id = profile_id;
        this.bio = bio === undefined ? '' : bio;
        this.location = location === undefined ? '' : location;
        this.birth_date = birth_date === undefined ? '' : birth_date;
        this.image = image === undefined ? '' : image;
        this.skills = skills === undefined ? [] : skills;
        this.created = created === undefined ? '' : created;
        this.last_updated = last_updated === undefined ? '' : last_updated;
        this.settings = settings;
        this.saved_tasks = saved_tasks === undefined ? [] : saved_tasks;
        this.crowd_requests = crowd_requests;
        this.notification_count = notification_count;
    }
}
