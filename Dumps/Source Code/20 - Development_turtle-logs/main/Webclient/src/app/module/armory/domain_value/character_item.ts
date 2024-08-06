export interface CharacterItem {
    id: number;
    item_id: number;
    random_property_id: number | null;
    enchant_id: number | null;
    gem_ids: Array<number | null>;
}
