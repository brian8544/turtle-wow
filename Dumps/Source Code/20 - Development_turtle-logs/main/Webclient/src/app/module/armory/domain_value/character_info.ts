import {CharacterGear} from "./character_gear";

export interface CharacterInfo {
    id: number;
    gear: CharacterGear;
    hero_class_id: number;
    level: number;
    gender: boolean;
    profession1: number | null;
    profession2: number | null;
    talent_specialization: string | null;
    race_id: number;
}
