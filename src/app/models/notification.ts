import { User } from 'app/models/user';

export class Notification {
    datetime: Date;
    message: string;
    relative_url = '';
    query_params: object = {};
    user: User;
    is_new: boolean;

    constructor(datetime: Date, message: string, relative_url: string, user: User, is_new: boolean) {
        this.datetime = datetime;
        this.message = message;
        this.user = user;
        this.is_new = is_new;
        this.parseUrl(relative_url);
    }

    private parseUrl(url: string) {
        const split_url = url.split('?');
        this.relative_url = split_url[0];

        if (split_url.length > 1) {
            const split_params = split_url[1].split('&');

            for (let i = 0; i < split_params.length; i++) {
                if (split_params[i].includes('=')) {
                    const split_x = split_params[i].split('=');
                    this.query_params[split_x[0]] = split_x[1];
                }
            }
        }
    }
}
