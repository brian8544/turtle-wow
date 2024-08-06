use schemars::JsonSchema;

#[derive(Serialize, Deserialize, JsonSchema, Debug, Clone)]
pub struct APIToken {
    pub id: u32,
    pub member_id: u32,
    pub token: Option<String>,
    pub purpose: String,
    pub exp_date: u64,
}
