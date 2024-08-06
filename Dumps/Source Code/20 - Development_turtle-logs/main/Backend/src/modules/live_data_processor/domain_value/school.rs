#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
#[repr(u8)]
pub enum School {
    Physical = 0x01,
    Holy = 0x02,
    Fire = 0x04,
    Nature = 0x08,
    Frost = 0x10,
    Shadow = 0x20,
    Arcane = 0x40,
}
