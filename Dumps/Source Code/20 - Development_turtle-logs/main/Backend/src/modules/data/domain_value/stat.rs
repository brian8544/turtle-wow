#[derive(Debug, Clone, Serialize, JsonSchema, PartialEq)]
pub struct Stat {
    pub stat_type: u8,
    pub stat_value: u16,
}
