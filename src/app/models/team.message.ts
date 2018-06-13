import { User } from './user';

export class TeamMessage {
    id: number;
    user: User;
    body: string;
    created: string;
    last_updated: string;
    replies: TeamMessageReply[];

    constructor(
        id: number,
        user: User,
        body: string,
        created: string,
        last_updated: string,
        replies?: TeamMessageReply[],
    ) {
        this.id = id;
        this.user = user;
        this.body = body;
        this.created = created;
        this.last_updated = last_updated;
        this.replies = replies === undefined ? [] : replies;
    }
}

export class TeamMessageReply {
    id: number;
    user: User;
    body: string;
    last_updated: string;

    constructor(
        id: number,
        user: User,
        body: string,
        last_updated: string,
    ) {
        this.id = id;
        this.user = user;
        this.body = body;
        this.last_updated = last_updated;
    }
}