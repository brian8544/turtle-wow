#[derive(Debug, Clone, Serialize, JsonSchema, PartialEq)]
pub struct Spell {
    pub id: u32,
    pub expansion_id: u8,
    pub localization_id: u32,
    pub subtext_localization_id: u32,
    pub cost: u16,
    pub cost_in_percent: bool,
    pub power_type: u8,
    pub cast_time: u32,
    pub school_mask: u16,
    pub dispel_type: u8,
    pub range_max: u32,
    pub cooldown: u32,
    pub duration: i32,
    pub icon: u16,
    pub description_localization_id: u32,
    pub aura_localization_id: u32,
}
