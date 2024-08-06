use crate::modules::live_data_processor::dto::{DamageComponent, Unit};

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema, PartialEq)]
pub struct DamageDone {
    pub attacker: Unit,
    pub victim: Unit,
    pub spell_id: Option<u32>,
    pub hit_mask: u32,
    pub blocked: u32,
    pub damage_over_time: bool,
    pub damage_components: Vec<DamageComponent>,
}

pub fn get_damage_components_total(components: &Vec<DamageComponent>) -> u32 {
    components.iter().fold(0, |acc, comp| acc + comp.damage)
}
