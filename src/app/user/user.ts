import { Comment } from '../comment/comment';
import { Project } from '../project/project';

export class User {
	constructor(    
		id: number,
		username: string,
		email: string,
		password: string,
		date_joined: string,
		first_name: string,
		last_name: string,
		last_login?: string,
		bio?: string,
		location?: string,
		birth_date?: string,
		image_name?: string,
		projects?: Project[],
		comments?: Comment[]) {}
}