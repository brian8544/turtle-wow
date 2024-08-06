use schemars::JsonSchema;

#[derive(Deserialize, Serialize, Debug, JsonSchema)]
pub struct Member {
    pub id: u32,
    pub nickname: String,
    pub mail: String,
    pub password: String,
    pub salt: String,
    pub mail_confirmed: bool,
    pub forgot_password: bool,
    pub delete_account: bool,
    pub new_mail: String, // Non-Empty means that a change was requested
    pub access_rights: u32,
    pub default_privacy_type: u8
}
