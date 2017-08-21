import { Comment } from '../comment/comment';
import { User } from '../user/user';
import { Team } from '../team/team';
import { Task } from '../team/task';

export class Project {
	id: number;
	title: string;
	user: User;
	category: string;
	comments: Comment[];
	description: string;
	create_datetime: string;
	website: string;
	team: Team;
	tasks: Task[];

	constructor(
		id: number,
		title: string,
		user: User,
		category: string,
		comments: Comment[],
		description: string,
		create_datetime: string,
		team: Team,
		tasks: Task[],
		website?: string
	) { }
}