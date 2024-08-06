use schemars::JsonSchema;

#[derive(Serialize, Deserialize, JsonSchema, Debug)]
pub struct AccountInformation {
    pub id: u32,
    pub mail: String,
    pub nickname: String,
    pub mail_confirmed: bool,
    pub access_rights: u32,
    pub default_privacy_type: u8
}
