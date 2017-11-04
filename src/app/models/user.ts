import { Project } from './project';

export class User {
	id: number;
	username: string;
	email: string;
	password: string;
	date_joined: string;
	name: string;
	last_login: string;
	projects: Project[];
	bio: string;
	location: string;
	birth_date: string;
	image_name: string;

	constructor(
		id: number,
		username: string,
		email: string,
		password: string,
		date_joined: string,
		first_name: string,
		last_name: string,
		last_login: string,
		projects: Project[],
		bio: string,
		location: string,
		birth_date: string,
		image_name: string
	) {
		this.id = id;
		this.username = username;
		this.email = email;
		this.password = password;
		this.date_joined = date_joined;
		this.name = first_name + " " + last_name;
		this.last_login = last_login;
		this.projects = projects;
		this.bio = bio == undefined ? "" : bio;
		this.location = location == undefined ? "" : location;
		this.birth_date = birth_date == undefined ? "" : birth_date;
		this.image_name = image_name == undefined ? "" : image_name;
	}
}