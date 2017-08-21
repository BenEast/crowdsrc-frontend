import { Project } from '../project/project';
import { User } from '../user/user';

export class Comment {
    id;
    user;
    project;
    body;
    create_datetime;

    constructor(
        id,
        user,
        project,
        body,
        create_datetime) {
        this.id = id;
        this.user = user;
        this.project = project;
        this.body = body;
        this.create_datetime = create_datetime;
    }
}