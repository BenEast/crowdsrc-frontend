import { User } from '../user/user';

export class TeamMessage {
    id: number;
    user: User;
    body: string;
    create_datetime: string;
    is_public: boolean;
}