import {CharacterItem} from "./character_item";

export interface CharacterGear {
    id: number;
    head: CharacterItem | null;
    neck: CharacterItem | null;
    shoulder: CharacterItem | null;
    back: CharacterItem | null;
    chest: CharacterItem | null;
    shirt: CharacterItem | null;
    tabard: CharacterItem | null;
    wrist: CharacterItem | null;
    main_hand: CharacterItem | null;
    off_hand: CharacterItem | null;
    ternary_hand: CharacterItem | null;
    glove: CharacterItem | null;
    belt: CharacterItem | null;
    leg: CharacterItem | null;
    boot: CharacterItem | null;
    ring1: CharacterItem | null;
    ring2: CharacterItem | null;
    trinket1: CharacterItem | null;
    trinket2: CharacterItem | null;
}
