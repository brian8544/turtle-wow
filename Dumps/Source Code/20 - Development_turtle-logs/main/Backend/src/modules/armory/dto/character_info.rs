use crate::{dto::CheckPlausability, modules::armory::dto::CharacterGearDto};

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
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

impl CheckPlausability for CharacterInfoDto {
    fn is_plausible(&self) -> bool {
        self.gear.is_plausible()
            && self.hero_class_id > 0
            && self.level > 0
            && self.level <= 110
            && (self.profession1.is_none() || *self.profession1.as_ref().unwrap() > 0)
            && (self.profession2.is_none() || *self.profession2.as_ref().unwrap() > 0)
            && (self.talent_specialization.is_none() || (!self.talent_specialization.as_ref().unwrap().is_empty() && self.talent_specialization.as_ref().unwrap().split('|').count() == 3))
            && self.race_id > 0
    }
}
