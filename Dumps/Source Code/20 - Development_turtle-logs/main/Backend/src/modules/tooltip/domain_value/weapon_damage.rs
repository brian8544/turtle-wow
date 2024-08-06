#[derive(Debug, Clone, Serialize, JsonSchema)]
pub struct WeaponDamage {
    pub damage_min: u16,
    pub damage_max: u16,
    pub damage_type: Option<String>,
}
