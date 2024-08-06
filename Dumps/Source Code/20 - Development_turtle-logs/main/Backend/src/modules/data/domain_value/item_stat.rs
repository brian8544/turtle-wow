use crate::modules::data::domain_value::Stat;

#[derive(Debug, Clone, Serialize, JsonSchema, PartialEq)]
pub struct ItemStat {
    pub id: u32,
    pub expansion_id: u8,
    pub item_id: u32,
    pub stat: Stat,
}
