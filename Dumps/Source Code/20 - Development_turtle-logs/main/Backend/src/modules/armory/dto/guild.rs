use crate::dto::CheckPlausability;

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct GuildDto {
    pub server_uid: u64,
    pub name: String,
}

impl CheckPlausability for GuildDto {
    fn is_plausible(&self) -> bool {
        self.server_uid > 0 && !self.name.is_empty()
    }
}
