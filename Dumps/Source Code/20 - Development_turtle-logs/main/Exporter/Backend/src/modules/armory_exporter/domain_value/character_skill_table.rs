#[derive(Debug, Clone)]
pub struct CharacterSkillTable {
    pub character_id: u32,
    pub skill_id: u32,
    pub value: u32,
    pub max: u32,
}
