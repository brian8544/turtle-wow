import {ArenaTeamSizeType} from "./arena_team_size_type";

export interface ArenaTeam {
    id: number;
    server_uid: number;
    server_id: number;
    team_name: string;
    size_type: ArenaTeamSizeType;
}
