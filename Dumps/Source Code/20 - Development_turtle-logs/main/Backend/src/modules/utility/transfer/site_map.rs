use rocket::response::content::Xml;
use rocket::State;

use crate::modules::armory::Armory;
use crate::modules::data::Data;
use crate::modules::utility::Utility;
use crate::modules::utility::tools::SiteMap;

#[openapi]
#[get("/site_map_char_gen/<page>")]
pub fn build_character_site_map(me: State<Utility>, data: State<Data>, armory: State<Armory>, page: u32) -> Xml<String> {
    Xml(me.build_character_site_map(&armory, &data, page))
}

#[openapi]
#[get("/site_map_guild_gen/<page>")]
pub fn build_guild_site_map(me: State<Utility>, data: State<Data>, armory: State<Armory>, page: u32) -> Xml<String> {
    Xml(me.build_guild_site_map(&armory, &data, page))
}

#[openapi]
#[get("/site_map_pastebin_gen/<page>")]
pub fn build_pastebin_site_map(me: State<Utility>, page: u32) -> Xml<String> {
    Xml(me.build_pastebin_site_map(page))
}