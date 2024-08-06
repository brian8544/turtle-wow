use crate::modules::data::domain_value::HeroClassTalent;

#[derive(Debug, Clone, Serialize, JsonSchema, PartialEq)]
pub struct HeroClass {
    pub id: u8,
    pub localization_id: u32,
    pub color: String,
    pub talents: [HeroClassTalent; 3],
}
