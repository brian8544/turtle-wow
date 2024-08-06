#[derive(Debug, Clone, Serialize, JsonSchema)]
pub struct SpellCost {
    pub cost: u16,
    pub cost_in_percent: bool,
    pub power_type: String,
}
