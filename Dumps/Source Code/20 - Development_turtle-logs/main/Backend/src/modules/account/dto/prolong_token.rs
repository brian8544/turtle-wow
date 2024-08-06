use schemars::JsonSchema;

#[derive(Deserialize, Serialize, Debug, JsonSchema)]
pub struct ProlongToken {
    pub token: String,
    pub days: u32,
}
