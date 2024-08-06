use crate::dto::CheckPlausability;

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct CharacterItemDto {
    pub item_id: u32,
    pub random_property_id: Option<i16>,
    pub enchant_id: Option<u32>,
    pub gem_ids: Vec<Option<u32>>,
}

impl CheckPlausability for CharacterItemDto {
    fn is_plausible(&self) -> bool {
        self.item_id > 0
            && (self.random_property_id.is_none() || *self.random_property_id.as_ref().unwrap() != 0)
            && (self.enchant_id.is_none() || *self.enchant_id.as_ref().unwrap() > 0)
            && (self.gem_ids.is_empty() || self.gem_ids.iter().all(|gem| gem.is_none() || *gem.as_ref().unwrap() > 0))
    }
}
