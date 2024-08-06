import {HistoryMoment} from "./history_moment";
import {CharacterHistory} from "./character_history";

export interface Character {
    id: number;
    server_id: number;
    server_uid: number;
    last_update: CharacterHistory | null;
    history_moments: Array<HistoryMoment>;
}
