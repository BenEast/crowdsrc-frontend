import { Skill } from 'app/models/skill';

export class Task {
    id: number;
    title: string;
    description: string;
    created: Date;
    last_updated: Date;
    status: string;
    is_saved: boolean;
    skills: Skill[];
    submissions: TaskSubmission[];

    constructor(
        id: number,
        title: string,
        description: string,
        created: Date,
        last_updated: Date,
        status: string,
        is_saved: boolean,
        skills?: Skill[],
        submissions?: TaskSubmission[],
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.created = created;
        this.last_updated = last_updated;
        this.is_saved = is_saved;
        this.skills = skills === undefined ? [] : skills;
        this.submissions = submissions === undefined ? [] : submissions;
    }
}

export class TaskSubmission {
    id: number;
    user_id: number;
    last_updated: Date;
    is_accepted: boolean;
    files: SubmissionFile[];

    constructor(
        id: number,
        user_id: number,
        last_updated: string,
        is_accepted: boolean,
        files: SubmissionFile[]
    ) {
        this.id = id;
        this.user_id = user_id;
        this.last_updated = new Date(last_updated);
        this.is_accepted = is_accepted;
        this.files = files;
    }
}

export class SubmissionFile {
    id: number;
    filename: string;
    size: string;
    data: string;

    constructor(
        id: number,
        filename: string,
        size: string,
        data?: string
    ) {
        this.id = id;
        this.filename = filename;
        this.size = size;
        this.data = data === undefined ? '' : data;
    }
}
