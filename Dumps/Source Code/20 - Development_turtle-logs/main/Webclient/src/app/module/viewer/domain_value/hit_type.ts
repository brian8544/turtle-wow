export enum HitType {
    None = "None",
    OffHand = "OffHand",
    Evade = "Evade",
    Miss = "Miss",
    Dodge = "Dodge",
    PartialBlock = "PartialBlock",
    FullBlock = "FullBlock",
    Parry = "Parry",
    Glancing = "Glancing",
    Crit = "Crit",
    Crushing = "Crushing",
    Hit = "Hit",
    PartialResist = "PartialResist",
    FullResist = "FullResist",
    Immune = "Immune",
    Environment = "Environment",
    PartialAbsorb = "PartialAbsorb",
    FullAbsorb = "FullAbsorb",
    Interrupt = "Interrupt",
    Deflect = "Deflect",
    Split = "Split",
    Reflect = "Reflect"
}

const translation: Array<[HitType, number]> = [
    [HitType.None, 0x00000000],
    [HitType.Glancing, 0x00000100],  // Placed here, such that it is recognized before a hit as a hit category
    [HitType.Crushing, 0x00000200],
    [HitType.Deflect, 0x00008000],
    [HitType.Reflect, 0x00100000],
    [HitType.Immune, 0x00002000],
    [HitType.Split, 0x00080000],
    [HitType.OffHand, 0x00000001],
    [HitType.Hit, 0x00000002],
    [HitType.Crit, 0x00000004],
    [HitType.PartialResist, 0x00000008],
    [HitType.FullResist, 0x00000010],
    [HitType.Miss, 0x00000020],
    [HitType.PartialAbsorb, 0x00000040],
    [HitType.FullAbsorb, 0x00000080],
    [HitType.Evade, 0x00000400],
    [HitType.Dodge, 0x00000800],
    [HitType.Parry, 0x00001000],
    [HitType.Environment, 0x00004000],
    [HitType.Interrupt, 0x00010000],
    [HitType.PartialBlock, 0x00020000],
    [HitType.FullBlock, 0x00040000],
];

export function hit_mask_to_hit_type_array(hit_mask: number): Array<HitType> {
    const result = [];
    for (const [hit_type, mask] of translation)
        if ((hit_mask & mask) > 0)
            result.push(hit_type);
    return result;
}
