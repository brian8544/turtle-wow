use crate::modules::data::domain_value::Stat;

#[derive(Debug, Clone, Serialize, JsonSchema, PartialEq)]
pub struct Enchant {
    pub expansion_id: u8,
    pub id: u32,
    pub localization_id: u32,
    pub stats: Vec<Stat>,
}
