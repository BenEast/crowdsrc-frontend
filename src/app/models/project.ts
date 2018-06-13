import { User } from './user';
import { TeamMessage } from './team.message';
import { Task } from './task';
import { Skill } from 'app/models/skill';

export class Category {
	name: string;
	constructor(name: string) { this.name = name }
}

export class Project {
	id: number;
	title: string;
	user: User;
	categories: Category[];
	description: string;
	created: string;
	last_updated: string;

	task_count: number;
	message_count: number;

	website?: string;

	messages?: TeamMessage[];
	tasks?: Task[];
	top_skills?: any;

	constructor(
		id: number,
		title: string,
		user: User,
		categories: Category[],
		description: string,
		created: string,
		last_updated: string,
		task_count: number,
		message_count: number,
		website?: string,
		messages?: TeamMessage[],
		tasks?: Task[],
		top_skills?,
	) {
		// Required fields
		this.id = id;
		this.title = title;
		this.user = user;
		this.categories = categories;
		this.description = description;
		this.created = created;
		this.last_updated = last_updated;
		this.task_count = task_count;
		this.message_count = message_count;

		// Optional fields
		this.website = website === undefined ? '' : website;
		this.messages = messages === undefined ? [] : messages;
		this.tasks = tasks === undefined ? [] : tasks;
		this.top_skills = top_skills === undefined ? [] : top_skills;
	}
}
