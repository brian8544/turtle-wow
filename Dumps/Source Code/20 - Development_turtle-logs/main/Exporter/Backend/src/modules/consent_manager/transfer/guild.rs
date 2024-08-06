use rocket::State;

use crate::dto::Failure;
use crate::modules::consent_manager::guard::Authenticate;
use crate::modules::consent_manager::tools::GuildConsent;
use crate::modules::ConsentManager;
use crate::DbLpConsent;

#[post("/guild/<guild_id>/<character_id>")]
pub fn give_consent(mut db_lp_consent: DbLpConsent, me: State<ConsentManager>, _auth: Authenticate, guild_id: u32, character_id: u32) -> Result<(), Failure> {
    me.give_consent(&mut *db_lp_consent, guild_id, character_id)
}

#[delete("/guild/<guild_id>/<character_id>")]
pub fn withdraw_consent(mut db_lp_consent: DbLpConsent, me: State<ConsentManager>, _auth: Authenticate, guild_id: u32, character_id: u32) -> Result<(), Failure> {
    me.withdraw_consent(&mut *db_lp_consent, guild_id, character_id)
}
