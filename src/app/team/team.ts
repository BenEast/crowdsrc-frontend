import { TeamMember } from './team.member';
import { TeamMessage } from './team.message';

export class Team {
    id: number;
    members: TeamMember[];
    messages: TeamMessage[];
    is_public: boolean;
}