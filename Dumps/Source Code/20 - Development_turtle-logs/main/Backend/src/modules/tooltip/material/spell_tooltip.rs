use crate::modules::tooltip::domain_value::SpellCost;

#[derive(Debug, Clone, Serialize, JsonSchema)]
pub struct SpellTooltip {
    pub name: String,
    pub icon: String,
    pub subtext: String,
    pub spell_cost: Option<SpellCost>,
    pub range: u32,
    pub description: String,
}
