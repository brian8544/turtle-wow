#[derive(Debug, Clone, Serialize, JsonSchema, PartialEq)]
pub struct EncounterNpc {
    pub encounter_id: u32,
    pub npc_id: u32,
    pub requires_death: bool,
    pub can_start_encounter: bool,
    pub is_pivot: bool,
    pub health_treshold: Option<u8>,
}
