use crate::modules::transport_layer::CharacterGearDto;

#[derive(Debug, Clone, Serialize)]
pub struct CharacterInfoDto {
    pub gear: CharacterGearDto,
    pub hero_class_id: u8,
    pub level: u8,
    pub gender: bool,
    pub profession1: Option<u16>,
    pub profession2: Option<u16>,
    pub talent_specialization: Option<String>,
    pub race_id: u8,
}
