#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema, PartialEq)]
pub struct DamageComponent {
    pub school_mask: u8,
    pub damage: u32,
    pub resisted_or_glanced: u32,
    pub absorbed: u32,
}
