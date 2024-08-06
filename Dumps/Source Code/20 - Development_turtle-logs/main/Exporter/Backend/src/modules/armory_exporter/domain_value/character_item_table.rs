#[derive(Debug, Clone)]
pub struct CharacterItemTable {
    pub character_id: u32,
    pub item_guid: u32,
    pub item_id: u32,
    pub slot: u32,
    pub random_property_id: i16,
    pub enchant_ids: [u32; 11],
}
