use crate::modules::live_data_processor::domain_value::{Mitigation, SchoolMask};

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct SpellComponent {
    pub school_mask: SchoolMask,
    pub amount: u32,
    pub mitigation: Vec<Mitigation>,
}

pub fn get_spell_components_total(components: &Vec<SpellComponent>) -> u32 {
    components.iter().fold(0, |acc, comp| {
        acc + comp.amount
            + comp
                .mitigation
                .iter()
                .find_map(|mitigation| {
                    if let Mitigation::Absorb(amount) = mitigation {
                        return Some(*amount);
                    }
                    None
                })
                .unwrap_or(0)
    })
}
