use crate::modules::instance::material::Role;

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct InstanceViewerParticipant {
    pub character_id: u32,
    pub name: String,
    pub hero_class_id: u8,
    pub role: Role,
}
