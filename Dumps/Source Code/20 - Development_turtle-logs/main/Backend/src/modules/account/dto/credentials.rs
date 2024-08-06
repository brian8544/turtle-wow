use schemars::JsonSchema;

#[derive(Deserialize, Serialize, Debug, JsonSchema, FromForm)]
pub struct Credentials {
    pub mail: String,
    pub password: String,
}
