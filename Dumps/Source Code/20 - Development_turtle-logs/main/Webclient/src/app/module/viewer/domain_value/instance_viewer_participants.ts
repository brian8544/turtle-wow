import {Role} from "./role";

export interface InstanceViewerParticipants {
    character_id: number;
    name: string;
    hero_class_id: number;
    role: Role;
}
