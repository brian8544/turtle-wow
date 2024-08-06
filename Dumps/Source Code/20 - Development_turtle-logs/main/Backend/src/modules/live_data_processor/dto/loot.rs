use crate::modules::live_data_processor::dto::Unit;

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema, PartialEq)]
pub struct Loot {
    pub unit: Unit,
    pub item_id: u32,
    pub count: u32,
}
