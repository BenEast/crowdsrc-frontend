import { TeamMember } from './team.member';

export class Task {
    id: number;
    title: string;
    description: string;
    status: string;
    last_updated: string;
    skills: string;
    members: TeamMember[];
    is_public: boolean;
}