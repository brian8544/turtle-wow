use crate::modules::armory::tools::strip_talent_specialization;
use crate::modules::armory::{domain_value::CharacterGear, dto::CharacterInfoDto};

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct CharacterInfo {
    pub id: u32,
    pub gear: CharacterGear,
    pub hero_class_id: u8,
    pub level: u8,
    pub gender: bool,
    pub profession1: Option<u16>,
    pub profession2: Option<u16>,
    pub talent_specialization: Option<String>,
    pub race_id: u8,
}

impl PartialEq for CharacterInfo {
    fn eq(&self, other: &Self) -> bool {
        self.id == other.id
    }
}

impl CharacterInfo {
    pub fn compare_by_value(&self, other: &CharacterInfoDto) -> bool {
        self.gear.compare_by_value(&other.gear)
            && self.hero_class_id == other.hero_class_id
            && self.level == other.level
            && self.gender == other.gender
            && self.profession1 == other.profession1
            && self.profession2 == other.profession2
            && self.talent_specialization == strip_talent_specialization(&other.talent_specialization)
            && self.race_id == other.race_id
    }

    pub fn deep_eq(&self, other: &Self) -> bool {
        self.id == other.id
            && self.gear.deep_eq(&other.gear)
            && self.hero_class_id == other.hero_class_id
            && self.level == other.level
            && self.gender == other.gender
            && self.profession1 == other.profession1
            && self.profession2 == other.profession2
            && self.talent_specialization == other.talent_specialization
            && self.race_id == other.race_id
    }
}
