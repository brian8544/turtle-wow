use crate::dto::CheckPlausability;

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct CharacterFacialDto {
    pub skin_color: u8,
    pub face_style: u8,
    pub hair_style: u8,
    pub hair_color: u8,
    pub facial_hair: u8,
}

// Not sure what values this may have
impl CheckPlausability for CharacterFacialDto {
    fn is_plausible(&self) -> bool {
        true
    }
}
