use rocket::State;
use rocket_contrib::json::Json;

use crate::modules::data::domain_value::Localized;
use crate::modules::data::dto::BasicItem;
use crate::modules::data::guard::Language;
use crate::modules::data::tools::{RetrieveIcon, RetrieveLocalization};
use crate::modules::data::{domain_value::Item, tools::RetrieveItem, Data};

#[openapi]
#[get("/item/<expansion_id>/<item_id>")]
pub fn get_item(me: State<Data>, expansion_id: u8, item_id: u32) -> Option<Json<Item>> {
    me.get_item(expansion_id, item_id).map(Json)
}

#[openapi]
#[get("/item/localized/basic_item/<expansion_id>/<item_id>")]
pub fn get_localized_basic_item(me: State<Data>, language: Language, expansion_id: u8, item_id: u32) -> Option<Json<Localized<BasicItem>>> {
    me.get_item(expansion_id, item_id)
        .map(|item| Localized {
            base: BasicItem {
                id: item_id,
                icon: me.get_icon(item.icon).unwrap().name,
                quality: item.quality,
            },
            localization: me.get_localization(language.0, item.localization_id).map(|localization| localization.content).unwrap_or_else(|| String::from("NOT LOCALIZED")),
        })
        .map(Json)
}
