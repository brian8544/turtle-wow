#[derive(Debug)]
pub struct CharacterGuildTable {
    pub character_id: u32,
    pub guild_id: u32,
    pub guild_name: String,
    pub rank_index: u8,
    pub rank_name: String,
}
