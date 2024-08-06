#[derive(Debug, Clone, Serialize, JsonSchema, PartialEq)]
pub struct ItemRandomProperty {
    pub expansion_id: u8,
    pub id: i16,
    pub localization_id: u32,
    pub enchant_ids: Vec<u32>,
    pub scaling_coefficients: Vec<u32>,
}
