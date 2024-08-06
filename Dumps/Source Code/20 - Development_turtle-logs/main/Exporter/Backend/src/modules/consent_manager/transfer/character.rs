use rocket::State;

use crate::dto::Failure;
use crate::modules::consent_manager::domain_value::CharacterWithConsent;
use crate::modules::consent_manager::guard::Authenticate;
use crate::modules::consent_manager::tools::{CharacterConsent, ManagerFrontend};
use crate::modules::ConsentManager;
use crate::{DbCharacters, DbLpConsent};
use rocket_contrib::json::Json;

#[get("/character")]
pub fn get_characters(mut db_characters: DbCharacters, me: State<ConsentManager>, auth: Authenticate) -> Json<Vec<CharacterWithConsent>> {
    Json(me.get_characters(&mut *db_characters, auth.0))
}

#[post("/character/<character_id>")]
pub fn give_consent(mut db_lp_consent: DbLpConsent, me: State<ConsentManager>, _auth: Authenticate, character_id: u32) -> Result<(), Failure> {
    let opt_in_mode = std::env::var("OPT_IN_MODE").unwrap().parse::<bool>().unwrap();
    if opt_in_mode {
        me.give_consent(&mut *db_lp_consent, character_id)
    } else {
        me.withdraw_consent(&mut *db_lp_consent, character_id)
    }
}

#[delete("/character/<character_id>")]
pub fn withdraw_consent(mut db_lp_consent: DbLpConsent, me: State<ConsentManager>, _auth: Authenticate, character_id: u32) -> Result<(), Failure> {
    let opt_in_mode = std::env::var("OPT_IN_MODE").unwrap().parse::<bool>().unwrap();
    if opt_in_mode {
        me.withdraw_consent(&mut *db_lp_consent, character_id)
    } else {
        me.give_consent(&mut *db_lp_consent, character_id)
    }
}
