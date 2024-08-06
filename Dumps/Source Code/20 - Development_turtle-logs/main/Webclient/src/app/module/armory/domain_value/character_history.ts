import {ArenaTeam} from "./arena_team";
import {CharacterFacial} from "./character_facial";
import {CharacterGuild} from "./character_guild";
import {CharacterInfo} from "./character_info";

export interface CharacterHistory {
    id: number;
    character_id: number;
    character_info: CharacterInfo;
    character_name: string;
    character_guild: CharacterGuild | null;
    character_title: number | null;
    profession_skill_points1: number | null;
    profession_skill_points2: number | null;
    facial: CharacterFacial | null;
    arena_teams: Array<ArenaTeam>;
    timestamp: number;
}
