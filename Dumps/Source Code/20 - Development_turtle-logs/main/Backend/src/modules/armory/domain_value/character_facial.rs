use crate::modules::armory::dto::CharacterFacialDto;

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct CharacterFacial {
    pub id: u32,
    pub skin_color: u8,
    pub face_style: u8,
    pub hair_style: u8,
    pub hair_color: u8,
    pub facial_hair: u8,
}

impl Default for CharacterFacial {
    fn default() -> Self {
        CharacterFacial {
            id: 0,
            skin_color: 1,
            face_style: 1,
            hair_style: 1,
            hair_color: 1,
            facial_hair: 1,
        }
    }
}

impl PartialEq for CharacterFacial {
    fn eq(&self, other: &Self) -> bool {
        self.id == other.id
    }
}

impl CharacterFacial {
    pub fn compare_by_value(&self, other: &CharacterFacialDto) -> bool {
        self.skin_color == other.skin_color && self.face_style == other.face_style && self.hair_style == other.hair_style && self.hair_color == other.hair_color && self.facial_hair == other.facial_hair
    }

    pub fn deep_eq(&self, other: &Self) -> bool {
        self.id == other.id && self.face_style == other.face_style && self.hair_style == other.hair_style && self.hair_color == other.hair_color && self.facial_hair == other.facial_hair
    }
}
