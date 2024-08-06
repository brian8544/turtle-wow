#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema, PartialEq)]
#[repr(u8)]
pub enum PowerType {
    Mana = 0,
    Rage = 1,
    Focus = 2,
    Energy = 3,
    Happiness = 4,
    Health = 5,
}

impl PowerType {
    pub fn from_u8(number: u8) -> Option<Self> {
        Some(match number {
            0 => PowerType::Mana,
            1 => PowerType::Rage,
            2 => PowerType::Focus,
            3 => PowerType::Energy,
            4 => PowerType::Happiness,
            5 => PowerType::Health,
            _ => return None,
        })
    }
}
