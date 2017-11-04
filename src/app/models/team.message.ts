import { User } from './user';

export class TeamMessage {
    id: number;
    user: User;
    body: string;
    create_datetime: string;
    is_public: boolean;

    constructor(id: number,
        user: User,
        body: string,
        create_datetime: string,
        is_public: boolean) {
        this.id = id;
        this.user = user;
        this.body = body;
        this.create_datetime = create_datetime;
        this.is_public = is_public;
    }
}