#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub enum Mitigation {
    Glance(u32),
    Block(u32),
    Resist(u32),
    Absorb(u32),
}
