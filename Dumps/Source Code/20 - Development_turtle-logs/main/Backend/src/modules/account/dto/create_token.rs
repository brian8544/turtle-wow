use schemars::JsonSchema;

#[derive(Deserialize, Serialize, Debug, JsonSchema)]
pub struct CreateToken {
    pub purpose: String,
    pub exp_date: u64,
}
