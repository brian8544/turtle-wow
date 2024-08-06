export enum DataSet {
    DamageDone = "Damage done",
    DamageTaken = "Damage taken",
    TotalHealingDone = "Total healing done",
    TotalHealingTaken = "Total healing taken",
    EffectiveHealingDone = "Effective healing done",
    EffectiveHealingTaken = "Effective healing taken",
    OverhealingDone = "Overhealing done",
    OverhealingTaken = "Overhealing taken",
    ThreatDone = "Threat done",
    ThreatTaken = "Threat taken",
    AbsorbDone = "Absorb done",
    AbsorbTaken = "Absorb taken",
    HealAndAbsorbDone = "Effective heal and absorb done",
    HealAndAbsorbTaken = "Effective heal and absorb taken",

    // Events
    Deaths = "Deaths",
    Kills = "Kills",
    DispelsDone = "Dispels done",
    DispelsReceived = "Dispels received",
    InterruptDone = "Interrupt done",
    InterruptReceived = "Interrupt received",
    SpellStealDone = "Spell steal done",
    SpellStealReceived = "Spell steal received",

    // Misc
    SpellCasts = "Spell casts"
}

export function is_event_data_set(data_set: DataSet): boolean {
    return [DataSet.Deaths, DataSet.Kills, DataSet.DispelsDone, DataSet.DispelsReceived,
        DataSet.InterruptDone, DataSet.InterruptReceived, DataSet.SpellStealDone, DataSet.SpellStealReceived, DataSet.SpellCasts].includes(data_set);
}
