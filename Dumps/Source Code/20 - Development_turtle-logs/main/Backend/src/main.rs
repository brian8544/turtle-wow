#![allow(clippy::module_inception)]
#![allow(clippy::module_inception)]
#![allow(clippy::unused_unit)]
#![allow(clippy::ptr_arg)]
#![allow(clippy::blocks_in_if_conditions)]
#![allow(clippy::upper_case_acronyms)]
#![allow(clippy::collapsible_if)]
#![allow(clippy::from_str_radix_10)]
#![allow(dead_code)]
#![feature(proc_macro_hygiene, decl_macro, option_result_contains, test)]
#![feature(box_patterns)]
extern crate byteorder;
extern crate chrono;
extern crate dotenv;
extern crate grouping_by;
extern crate language;
#[macro_use]
extern crate lazy_static;
extern crate mail;
extern crate okapi;
extern crate rand;
extern crate regex;
extern crate reqwest;
#[macro_use]
extern crate rocket;
#[macro_use]
extern crate rocket_contrib;
extern crate rocket_multipart_form_data;
#[macro_use]
extern crate rocket_okapi;
extern crate rust_lapper;
#[macro_use]
extern crate serde_derive;
extern crate serde_json;
extern crate str_util;
extern crate time_util;
extern crate urlencoding;
extern crate validator;

use dotenv::dotenv;
pub use rocket_contrib::databases::mysql;
use rocket_contrib::databases::mysql::Opts;
use rocket_okapi::swagger_ui::{make_swagger_ui, SwaggerUIConfig, UrlObject};
use rocket_prometheus::PrometheusMetrics;

use crate::modules::{account, armory, data, instance, live_data_processor, tooltip, utility};

#[cfg(test)]
mod tests;

mod dto;
mod material;
mod modules;
mod rocket_impl;
mod util;

#[database("main")]
pub struct MainDb(mysql::Conn);

fn main() {
    dotenv().ok();
    let dns = std::env::var("MYSQL_URL").unwrap();
    let opts = Opts::from_url(&dns).unwrap();
    let mut conn = mysql::Conn::new(opts.clone()).unwrap();
    let instance_conn = mysql::Conn::new(opts).unwrap();

    let account = account::Account::default().init(&mut conn);
    let data = data::Data::default().init(&mut conn);
    let armory = armory::Armory::default().init(&mut conn);
    let tooltip = tooltip::Tooltip::default();
    let live_data_processor = live_data_processor::LiveDataProcessor::default().init(&mut conn);
    let instance = instance::Instance::default().init(instance_conn);
    let utility = utility::Utility::default().init(&mut conn);

    let prometheus = PrometheusMetrics::new();

    let swagger_ui_config = SwaggerUIConfig {
        url: "/openapi.json".to_string(),
        urls: vec![
            UrlObject {
                name: "Account".to_string(),
                url: "/API/account/openapi.json".to_string(),
            },
            UrlObject {
                name: "Data".to_string(),
                url: "/API/data/openapi.json".to_string(),
            },
            UrlObject {
                name: "Armory".to_string(),
                url: "/API/armory/openapi.json".to_string(),
            },
            UrlObject {
                name: "Tooltip".to_string(),
                url: "/API/tooltip/openapi.json".to_string(),
            },
            UrlObject {
                name: "Live Data Processor".to_string(),
                url: "/API/live_data_processor/openapi.json".to_string(),
            },
            UrlObject {
                name: "Instance".to_string(),
                url: "/API/instance/openapi.json".to_string(),
            },
            UrlObject {
                name: "Utility".to_string(),
                url: "/API/utility/openapi.json".to_string(),
            },
        ],
        ..Default::default()
    };

    rocket::ignite()
        .manage(account)
        .manage(data)
        .manage(armory)
        .manage(tooltip)
        .manage(live_data_processor)
        .manage(instance)
        .manage(utility)
        .attach(MainDb::fairing())
        .attach(prometheus.clone())
        .mount("/metrics", prometheus)
        .mount("/API/", make_swagger_ui(&swagger_ui_config))
        .mount(
            "/API/account/",
            routes_with_openapi![
                account::transfer::login::login,
                account::transfer::token::create_token,
                account::transfer::token::get_tokens,
                account::transfer::token::delete_token,
                account::transfer::token::prolong_token,
                account::transfer::delete::request,
                account::transfer::delete::confirm,
                account::transfer::create::create,
                account::transfer::create::confirm,
                account::transfer::create::resend_confirm,
                account::transfer::get::get_account_information,
                account::transfer::forgot::receive_confirmation,
                account::transfer::forgot::send_confirmation,
                account::transfer::update::request_mail,
                account::transfer::update::confirm_mail,
                account::transfer::update::password,
                account::transfer::update::default_privacy,
                account::transfer::update::nickname,
                account::transfer::update::update_patreons,
                account::transfer::update::update_patreons_post,
            ],
        )
        .mount(
            "/API/data/",
            routes_with_openapi![
                data::transfer::expansion::get_expansion,
                data::transfer::expansion::get_all_expansions,
                data::transfer::language::get_language,
                data::transfer::language::get_all_languages,
                data::transfer::language::get_language_by_short_code,
                data::transfer::localization::get_localization,
                data::transfer::race::get_race,
                data::transfer::race::get_all_races,
                data::transfer::race::get_race_localized,
                data::transfer::race::get_all_races_localized,
                data::transfer::profession::get_profession,
                data::transfer::profession::get_all_professions,
                data::transfer::server::get_server,
                data::transfer::server::reload_server,
                data::transfer::server::get_all_servers,
                data::transfer::hero_class::get_hero_class,
                data::transfer::hero_class::get_all_hero_classes,
                data::transfer::hero_class::get_hero_class_localized,
                data::transfer::hero_class::get_all_hero_classes_localized,
                data::transfer::spell::get_spell,
                data::transfer::spell::get_localized_basic_spell,
                data::transfer::spell::get_localized_basic_spells,
                data::transfer::dispel_type::get_dispel_type,
                data::transfer::dispel_type::get_all_dispel_types,
                data::transfer::power_type::get_power_type,
                data::transfer::power_type::get_all_power_types,
                data::transfer::stat_type::get_stat_type,
                data::transfer::stat_type::get_all_stat_types,
                data::transfer::spell_effect::get_spell_effects,
                data::transfer::npc::get_npc,
                data::transfer::npc::get_npc_localized,
                data::transfer::npc::get_npcs_localized,
                data::transfer::icon::get_icon,
                data::transfer::item::get_item,
                data::transfer::item::get_localized_basic_item,
                data::transfer::gem::get_gem,
                data::transfer::enchant::get_enchant,
                data::transfer::item_bonding::get_item_bonding,
                data::transfer::item_bonding::get_all_item_bondings,
                data::transfer::item_class::get_item_class,
                data::transfer::item_class::get_all_item_classes,
                data::transfer::item_damage::get_item_damage,
                data::transfer::item_damage_type::get_item_damage_type,
                data::transfer::item_damage_type::get_all_item_damage_types,
                data::transfer::item_effect::get_item_effect,
                data::transfer::item_inventory_type::get_item_inventory_type,
                data::transfer::item_inventory_type::get_all_item_inventory_types,
                data::transfer::item_quality::get_item_quality,
                data::transfer::item_quality::get_all_item_qualities,
                data::transfer::item_random_property::get_item_random_property,
                data::transfer::item_sheath::get_item_sheath,
                data::transfer::item_sheath::get_all_item_sheaths,
                data::transfer::item_socket::get_item_socket,
                data::transfer::item_stat::get_item_stats,
                data::transfer::itemset_name::get_itemset_name,
                data::transfer::itemset_name::get_itemset_item_ids,
                data::transfer::itemset_effect::get_itemset_effects,
                data::transfer::title::get_title,
                data::transfer::title::get_all_titles,
                data::transfer::item_random_property_points::get_item_random_property_points,
                data::transfer::map::get_map,
                data::transfer::map::get_all_maps,
                data::transfer::map::get_all_maps_by_type,
                data::transfer::map::get_map_localized,
                data::transfer::map::get_all_maps_localized,
                data::transfer::map::get_all_maps_localized_by_type,
                data::transfer::difficulty::get_difficulty,
                data::transfer::difficulty::get_all_difficulties,
                data::transfer::difficulty::get_difficulty_localized,
                data::transfer::difficulty::get_all_difficulties_localized,
                data::transfer::encounter::get_encounter,
                data::transfer::encounter::get_all_encounters,
                data::transfer::encounter::get_all_encounters_localized,
                data::transfer::encounter_npc::get_encounter_npc,
                data::transfer::encounter_npc::get_all_encounter_npcs,
                data::transfer::addon::get_addon,
                data::transfer::addon::get_all_addons,
            ],
        )
        .mount(
            "/API/armory/",
            routes_with_openapi![
                armory::transfer::character::set_character,
                armory::transfer::character::get_character,
                armory::transfer::character::get_basic_character,
                armory::transfer::character::get_basic_characters,
                armory::transfer::character::get_character_by_uid,
                armory::transfer::character::delete_character,
                armory::transfer::character::delete_character_by_uid,
                armory::transfer::character::get_characters_by_name,
                armory::transfer::guild::get_guild,
                armory::transfer::guild::get_guilds_by_name,
                armory::transfer::guild::delete_guild,
                armory::transfer::guild::delete_guild_by_uid,
                armory::transfer::guild::create_guild,
                armory::transfer::guild::update_guild_name,
                armory::transfer::character_history::set_character_history,
                armory::transfer::character_history::get_character_history,
                armory::transfer::character_history::delete_character_history,
                armory::transfer::character_search::get_character_search_result,
                armory::transfer::character_viewer::get_character_viewer,
                armory::transfer::character_viewer::get_character_viewer_by_history,
                armory::transfer::character_viewer::get_character_viewer_by_history_date,
                armory::transfer::character_viewer::get_character_viewer_picture,
                armory::transfer::guild_viewer::get_guild_view,
                armory::transfer::guild_viewer::get_guild_roster
            ],
        )
        .mount(
            "/API/tooltip/",
            routes_with_openapi![
                tooltip::transfer::item_tooltip::get_item,
                tooltip::transfer::item_tooltip::get_character_item,
                tooltip::transfer::spell_tooltip::get_spell,
                tooltip::transfer::character_tooltip::get_character,
                tooltip::transfer::character_tooltip::get_character_by_ts,
                tooltip::transfer::guild_tooltip::get_guild
            ],
        )
        .mount(
            "/API/live_data_processor",
            routes_with_openapi![
                live_data_processor::transfer::package::get_package,
                live_data_processor::transfer::instance_reset::set_instance_resets,
                live_data_processor::transfer::upload::upload_log,
                live_data_processor::transfer::upload::get_upload_progress,
            ],
        )
        .mount(
            "/API/instance",
            routes_with_openapi![
                instance::transfer::export::get_instance_event_type,
                instance::transfer::export::get_instance_meta,
                instance::transfer::export::get_instance_participants,
                instance::transfer::export::get_instance_attempts,
                instance::transfer::meta::update_privacy,
                instance::transfer::meta::export_raids,
                instance::transfer::meta::export_rated_arenas,
                instance::transfer::meta::export_skirmishes,
                instance::transfer::meta::export_battlegrounds,
                instance::transfer::meta_search::export_raids,
                instance::transfer::meta_search::export_raids_by_member_id,
                instance::transfer::meta_search::export_raids_by_character_id,
                instance::transfer::meta_search::export_rated_arenas,
                instance::transfer::meta_search::export_skirmishes,
                instance::transfer::meta_search::export_battlegrounds,
                instance::transfer::ranking::get_instance_ranking_dps,
                instance::transfer::ranking::get_instance_ranking_dps_by_season,
                instance::transfer::ranking::get_instance_ranking_dps_by_server_and_season,
                instance::transfer::ranking::get_instance_ranking_hps,
                instance::transfer::ranking::get_instance_ranking_hps_by_season,
                instance::transfer::ranking::get_instance_ranking_hps_by_server_and_season,
                instance::transfer::ranking::get_instance_ranking_tps,
                instance::transfer::ranking::get_instance_ranking_tps_by_season,
                instance::transfer::ranking::get_instance_ranking_tps_by_server_and_season,
                instance::transfer::ranking::unrank_attempt,
                instance::transfer::delete::delete_instance,
                instance::transfer::speed_run::get_speed_runs,
                instance::transfer::speed_run::get_speed_runs_by_season,
                instance::transfer::speed_kill::get_speed_kills,
                instance::transfer::speed_kill::get_speed_kills_by_season,
            ],
        )
        .mount("/API/utility", routes_with_openapi![
            utility::transfer::tiny_url::get_tiny_url,
            utility::transfer::tiny_url::set_tiny_url,
            utility::transfer::site_map::build_character_site_map,
            utility::transfer::site_map::build_guild_site_map,
            utility::transfer::site_map::build_pastebin_site_map,
            utility::transfer::addon_paste::get_addon_paste,
            utility::transfer::addon_paste::get_addon_pastes,
            utility::transfer::addon_paste::replace_addon_paste,
            utility::transfer::addon_paste::delete_addon_paste,
            ])
        .launch();
}
