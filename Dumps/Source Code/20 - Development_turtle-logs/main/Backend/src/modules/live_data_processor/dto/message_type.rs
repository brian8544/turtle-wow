use crate::modules::live_data_processor::dto::{
    AuraApplication, CombatState, DamageDone, Death, Event, HealDone, InstanceArena, InstanceBattleground, InstanceMap, InstanceStart, InstanceStartRatedArena, InstanceUnratedArena, Interrupt, Loot, Position, Power, SpellCast, Summon, Threat,
    UnAura, Unit,
};

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema, PartialEq)]
pub enum MessageType {
    MeleeDamage(DamageDone),
    SpellDamage(DamageDone),
    Heal(HealDone),
    Death(Death),
    AuraApplication(AuraApplication),
    Dispel(UnAura),
    SpellSteal(UnAura),
    Interrupt(Interrupt),
    Position(Position),
    CombatState(CombatState),
    Power(Power),
    Loot(Loot),
    SpellCast(SpellCast),
    Threat(Threat),
    Event(Event),
    Summon(Summon),
    InstancePvPStartUnratedArena(InstanceStart),
    InstancePvPStartRatedArena(InstanceStartRatedArena),
    InstancePvPStartBattleground(InstanceStart),
    InstancePvPEndUnratedArena(InstanceUnratedArena),
    InstancePvPEndRatedArena(InstanceArena),
    InstancePvPEndBattleground(InstanceBattleground),
    InstanceDelete { instance_id: u32 },
    InstanceMap(InstanceMap),
    EncounterStart(u32),
    EncounterEnd(u32),
    SpellCastAttempt(SpellCast)
}

impl MessageType {
    // This feels like the wrong place for business logic
    // Its convenient here though
    pub fn extract_subject(&self) -> Option<Unit> {
        match self {
            MessageType::MeleeDamage(item) => Some(item.attacker.clone()),
            MessageType::SpellDamage(item) => Some(item.attacker.clone()),
            MessageType::Heal(item) => Some(item.caster.clone()),
            MessageType::Death(item) => Some(item.victim.clone()),
            MessageType::AuraApplication(item) => Some(item.target.clone()),
            MessageType::Dispel(item) => Some(item.un_aura_caster.clone()),
            MessageType::SpellSteal(item) => Some(item.un_aura_caster.clone()),
            MessageType::Position(item) => Some(item.unit.clone()),
            MessageType::InstanceMap(item) => Some(item.unit.clone()),
            MessageType::CombatState(item) => Some(item.unit.clone()),
            MessageType::Power(item) => Some(item.unit.clone()),
            MessageType::Loot(item) => Some(item.unit.clone()),
            MessageType::SpellCast(item) => Some(item.caster.clone()),
            MessageType::Threat(item) => Some(item.threater.clone()),
            MessageType::Event(item) => Some(item.unit.clone()),
            MessageType::Summon(item) => Some(item.unit.clone()),
            MessageType::Interrupt(item) => Some(item.target.clone()),
            MessageType::SpellCastAttempt(item) => Some(item.caster.clone()),

            // TODO!
            _ => None,
        }
    }
}
