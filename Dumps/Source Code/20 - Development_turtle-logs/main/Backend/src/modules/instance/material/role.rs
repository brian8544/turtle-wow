use crate::modules::armory::util::talent_tree::get_talent_tree;

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub enum Role {
    Tank,
    Healer,
    Dps,
}

impl Role {
    pub fn from_class_talent_string(hero_class_id: u8, talent_str: &str) -> Self {
        let tree = get_talent_tree(talent_str);

        // TODO: This only handles TBC and Vanilla ish
        match hero_class_id {
            1 => {
                if tree == 0 {
                    Self::Tank
                } else {
                    Self::Dps
                }
            },
            2 => {
                if tree == 0 {
                    Self::Healer
                } else if tree == 1 {
                    Self::Tank
                } else {
                    Self::Dps
                }
            },
            3 => Self::Dps,
            4 => Self::Dps,
            5 => {
                if tree == 2 {
                    Self::Dps
                } else {
                    Self::Healer
                }
            },
            7 => {
                if tree == 2 {
                    Self::Healer
                } else {
                    Self::Dps
                }
            },
            8 => Self::Dps,
            9 => Self::Dps,
            11 => {
                if tree == 2 {
                    Self::Healer
                } else {
                    Self::Dps
                }
            },
            _ => Self::Dps,
        }
    }
}
