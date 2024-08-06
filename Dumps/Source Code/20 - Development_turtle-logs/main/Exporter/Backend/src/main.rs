#![allow(dead_code)]
#![feature(proc_macro_hygiene, decl_macro)]
#[macro_use]
extern crate rocket;
#[macro_use]
extern crate rocket_contrib;
extern crate reqwest;
#[macro_use]
extern crate serde;
extern crate dotenv;
#[macro_use]
extern crate lazy_static;

use dotenv::dotenv;
use std::thread;

use modules::ConsentManager;

use crate::modules::{ArmoryExporter, CharacterDto, InstanceReset, ServerExporter, TransportLayer};
use crate::rocket_contrib::databases::mysql;
use std::sync::mpsc;

mod dto;
mod modules;

#[database("characters")]
pub struct DbCharacters(crate::rocket_contrib::databases::mysql::Conn);

#[database("lp_consent")]
pub struct DbLpConsent(crate::rocket_contrib::databases::mysql::Conn);

fn main() {
    dotenv().ok();

    let characters_dns = std::env::var("CHARACTERS_URL").unwrap();
    let lp_consent_dns = std::env::var("LP_CONSENT_URL").unwrap();
    let characters_opts = mysql::Opts::from_url(&characters_dns).unwrap();
    let lp_consent_opts = mysql::Opts::from_url(&lp_consent_dns).unwrap();
    let characters_conn = mysql::Conn::new(characters_opts).unwrap();
    let mut lp_consent_conn = mysql::Conn::new(lp_consent_opts).unwrap();

    let mut transport_layer = TransportLayer::default().init();
    let mut armory_exporter = ArmoryExporter::default().init(&mut lp_consent_conn);
    let mut server_exporter = ServerExporter::default().init();
    let mut consent_manager = ConsentManager::default();

    let (s_char, r_char) = mpsc::channel::<(u32, CharacterDto)>();
    let (s_char_consent, r_char_consent) = mpsc::channel::<(bool, u32)>();
    let (s_guild_consent, r_guild_consent) = mpsc::channel::<(bool, u32)>();
    let (s_server_msg, r_server_msg) = mpsc::channel::<(Vec<u32>, Vec<u8>)>();
    let (s_meta_data_instance_reset, r_meta_data_instance_reset) = mpsc::channel::<Vec<InstanceReset>>();

    *consent_manager.sender_character_consent.get_mut().unwrap() = Some(s_char_consent);
    *consent_manager.sender_guild_consent.get_mut().unwrap() = Some(s_guild_consent);
    armory_exporter.sender_character = Some(s_char);
    armory_exporter.sender_meta_data_instance_reset = Some(s_meta_data_instance_reset);
    server_exporter.sender_message = Some(s_server_msg);
    transport_layer.receiver_character_consent = Some(r_char_consent);
    transport_layer.receiver_guild_consent = Some(r_guild_consent);
    transport_layer.receiver_character = Some(r_char);
    transport_layer.receiver_server_message = Some(r_server_msg);
    transport_layer.receiver_meta_data_instance_reset = Some(r_meta_data_instance_reset);

    consent_manager = consent_manager.init(&mut lp_consent_conn);

    thread::spawn(move || transport_layer.run());
    thread::spawn(move || server_exporter.run());
    thread::spawn(move || armory_exporter.run(characters_conn, lp_consent_conn));

    rocket::ignite()
        .manage(consent_manager)
        .attach(DbCharacters::fairing())
        .attach(DbLpConsent::fairing())
        .mount(
            "/rpll/API/consent_manager/",
            routes![
                modules::consent_manager::transfer::character::get_characters,
                modules::consent_manager::transfer::character::give_consent,
                modules::consent_manager::transfer::character::withdraw_consent,
                modules::consent_manager::transfer::guild::give_consent,
                modules::consent_manager::transfer::guild::withdraw_consent,
            ],
        )
        .launch();
}
