use rocket::State;
use rocket_contrib::json::Json;

use crate::modules::{
    armory::{
        dto::{ArmoryFailure, CharacterViewerDto},
        tools::{CharacterViewer, GetCharacter},
        Armory,
    },
    data::{guard::Language, tools::RetrieveServer, Data},
};
use crate::MainDb;
use rocket::response::Redirect;

#[openapi]
#[get("/character_viewer/<server_name>/<character_name>")]
pub fn get_character_viewer(mut db_main: MainDb, me: State<Armory>, data: State<Data>, language: Language, server_name: String, character_name: String) -> Result<Json<CharacterViewerDto>, ArmoryFailure> {
    data.get_server_by_name(server_name).ok_or(ArmoryFailure::InvalidInput).and_then(|server| {
        me.get_character_by_name(server.id, character_name)
            .ok_or(ArmoryFailure::InvalidInput)
            .and_then(|character| me.get_character_viewer(&mut *db_main, &data, language.0, character.id).map(Json))
    })
}

#[openapi]
#[get("/character_viewer/<server_name>/<character_name>/<character_history_id>")]
pub fn get_character_viewer_by_history(mut db_main: MainDb, me: State<Armory>, data: State<Data>, language: Language, server_name: String, character_name: String, character_history_id: u32) -> Result<Json<CharacterViewerDto>, ArmoryFailure> {
    data.get_server_by_name(server_name).ok_or(ArmoryFailure::InvalidInput).and_then(|server| {
        me.get_character_by_name(server.id, character_name)
            .ok_or(ArmoryFailure::InvalidInput)
            .and_then(|character| me.get_character_viewer_by_history_id(&mut *db_main, &data, language.0, character_history_id, character.id).map(Json))
    })
}

#[openapi]
#[get("/character_viewer/by_date/<server_name>/<character_name>/<character_history_date>")]
pub fn get_character_viewer_by_history_date(
    mut db_main: MainDb, me: State<Armory>, data: State<Data>, language: Language, server_name: String, character_name: String, character_history_date: String,
) -> Result<Json<CharacterViewerDto>, ArmoryFailure> {
    data.get_server_by_name(server_name).ok_or(ArmoryFailure::InvalidInput).and_then(|server| {
        me.get_character_by_name(server.id, character_name)
            .ok_or(ArmoryFailure::InvalidInput)
            .and_then(|character| me.get_character_viewer_by_date(&mut *db_main, &data, language.0, character.id, character_history_date).map(Json))
    })
}

#[openapi(skip)]
#[get("/character_viewer_model/<character_history_id>")]
pub fn get_character_viewer_picture(mut db_main: MainDb, me: State<Armory>, data: State<Data>, character_history_id: u32) -> Result<Redirect, ArmoryFailure> {
    let model_data = me.get_character_viewer_model_data(&mut *db_main, &data, character_history_id)?;
    let uri = format!(
        "{}/model_viewer/{}{}/{}/{}/{}/{}/{}/{}",
        std::env::var("MODEL_GENERATOR").unwrap(),
        model_data.model_race,
        model_data.model_gender,
        model_data.character_facial.skin_color,
        model_data.character_facial.hair_style,
        model_data.character_facial.hair_color,
        model_data.character_facial.face_style,
        model_data.character_facial.facial_hair,
        model_data
            .model_items
            .iter()
            .map(|(inventory_type, display_info_id)| format!("{},{}", inventory_type, display_info_id))
            .collect::<Vec<String>>()
            .join("X")
    );
    Ok(Redirect::to(uri))
}
