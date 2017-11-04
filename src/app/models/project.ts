import { User } from './user';
import { Team } from './team';
import { Task } from './task';

export class Project {
	id: number;
	title: string;
	user: User;
	category: string;
	description: string;
	create_datetime: string;
	website: string;
	team: Team;
	tasks: Task[];
	team_member_count: number;
	task_count: number;
	
	constructor(
		id: number,
		title: string,
		user: User,
		category: string,
		description: string,
		create_datetime: string,
		team: Team,
		tasks: Task[],
		website?: string,
		team_member_count?: number,
		task_count?: number,
	) { }
}