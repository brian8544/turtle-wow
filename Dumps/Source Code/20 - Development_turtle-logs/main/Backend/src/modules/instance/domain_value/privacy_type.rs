#[derive(Clone, Debug, Serialize, Deserialize, JsonSchema, PartialEq)]
#[repr(u8)]
pub enum PrivacyType {
    Public,
    NotListed,
    OnlyGroups(u32)
}

impl PrivacyType {
    pub fn new(privacy_option: u8, privacy_group: u32) -> Self {
        match privacy_option {
            0 => Self::Public,
            1 => Self::NotListed,
            2 => Self::OnlyGroups(privacy_group),
            _ => unreachable!()
        }
    }

    pub fn get_group(&self) -> u32 {
        match self {
            PrivacyType::OnlyGroups(group) => *group,
            _ => 0
        }
    }

    pub fn to_u8(&self) -> u8 {
        match self {
            Self::Public => 0,
            Self::NotListed => 1,
            Self::OnlyGroups(_) => 2,
        }
    }
}