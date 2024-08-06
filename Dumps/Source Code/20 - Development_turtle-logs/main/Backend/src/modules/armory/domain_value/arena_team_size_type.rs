#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema, PartialEq, Eq)]
pub enum ArenaTeamSizeType {
    Size2v2 = 0,
    Size3v3 = 1,
    Size5v5 = 2,
    Undefined = 255,
}

impl ArenaTeamSizeType {
    pub fn from_tc_u8(number: u8) -> Self {
        match number {
            2 => ArenaTeamSizeType::Size2v2,
            3 => ArenaTeamSizeType::Size3v3,
            5 => ArenaTeamSizeType::Size5v5,
            _ => ArenaTeamSizeType::Undefined,
        }
    }

    pub fn from_u8(number: u8) -> Self {
        match number {
            0 => ArenaTeamSizeType::Size2v2,
            1 => ArenaTeamSizeType::Size3v3,
            2 => ArenaTeamSizeType::Size5v5,
            _ => ArenaTeamSizeType::Undefined,
        }
    }

    pub fn to_u8(&self) -> u8 {
        self.clone() as u8
    }
}
