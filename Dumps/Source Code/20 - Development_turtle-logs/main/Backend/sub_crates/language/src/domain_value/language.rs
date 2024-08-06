use strum_macros::{EnumCount, EnumIter};

#[repr(u8)]
#[derive(EnumCount, EnumIter, PartialEq)]
pub enum Language {
    English = 0,
    German = 1,
    Japanese = 2,
}

impl Language {
    pub fn from_u8(index: u8) -> Language {
        match index {
            0 => Language::English,
            1 => Language::German,
            2 => Language::Japanese,
            _ => Language::English,
        }
    }
}
