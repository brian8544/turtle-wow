use std::fs::File;
use std::io::{Read, Write};

use rocket::{Data, State};
use rocket::http::ContentType;
use rocket_multipart_form_data::{MultipartFormData, MultipartFormDataField, MultipartFormDataOptions, RawField};

use crate::MainDb;
use crate::modules::account::guard::Authenticate;
use crate::modules::armory::Armory;
use crate::modules::data::Data as DataMaterial;
use crate::modules::data::tools::RetrieveServer;
use crate::modules::live_data_processor::dto::LiveDataProcessorFailure;
use crate::modules::live_data_processor::LiveDataProcessor;
use crate::modules::live_data_processor::material::{WoWRetailClassicParser, WoWTBCParser, WoWVanillaParser, WoWWOTLKParser};
use crate::modules::live_data_processor::tools::cbl_parser::CombatLogParser;
use crate::modules::live_data_processor::tools::log_parser::parse_cbl;
use crate::modules::live_data_processor::tools::ProcessMessages;
use crate::params;
use crate::util::database::{Execute, Select};
use rocket_contrib::json::Json;

#[openapi(skip)]
#[post("/upload", format = "multipart/form-data", data = "<form_data>")]
pub fn upload_log(mut db_main: MainDb, auth: Authenticate, me: State<LiveDataProcessor>, data: State<DataMaterial>, armory: State<Armory>, content_type: &ContentType, form_data: Data) -> Result<(), LiveDataProcessorFailure> {
    let mut options = MultipartFormDataOptions::new();
    options.allowed_fields.push(MultipartFormDataField::bytes("payload").size_limit(40 * 1024 * 1024 * 1024));
    options.allowed_fields.push(MultipartFormDataField::bytes("server_id").size_limit(1024));
    //options.allowed_fields.push(MultipartFormDataField::bytes("start_time").size_limit(1024));
    //options.allowed_fields.push(MultipartFormDataField::bytes("end_time").size_limit(1024));

    let mut multipart_form_data = MultipartFormData::parse(content_type, form_data, options).unwrap();

    /*
    let mut start_time_raw_fields = multipart_form_data.raw.remove("start_time").ok_or(LiveDataProcessorFailure::InvalidStartTime)?;
    let start_time_raw_field = start_time_raw_fields.remove(0);
    let start_time_raw = std::str::from_utf8(&start_time_raw_field.raw).map_err(|_| LiveDataProcessorFailure::InvalidStartTime)?;
    let start_time = NaiveDateTime::parse_from_str(&start_time_raw, "%d.%m.%y %I:%M %p").ok().ok_or(LiveDataProcessorFailure::InvalidStartTime)?;

    let mut end_time_raw_fields = multipart_form_data.raw.remove("end_time").ok_or(LiveDataProcessorFailure::InvalidEndTime)?;
    let end_time_raw_field = end_time_raw_fields.remove(0);
    let end_time_raw = std::str::from_utf8(&end_time_raw_field.raw).map_err(|_| LiveDataProcessorFailure::InvalidEndTime)?;
    let end_time = NaiveDateTime::parse_from_str(&end_time_raw, "%d.%m.%y %I:%M %p").ok().ok_or(LiveDataProcessorFailure::InvalidEndTime)?;
     */

    {
        let mut upload_progress = me.upload_progress.write().unwrap();
        upload_progress.insert(auth.0, 0);
    }

    // The filtering functionality was removed
    let start_time_in_ms: u64 = time_util::now() * 1000;
    let end_time_in_ms: u64 = time_util::now() * 1000;

    let mut server_id_raw_fields = multipart_form_data.raw.remove("server_id").ok_or(LiveDataProcessorFailure::InvalidInput)?;
    let RawField { raw: server_id_raw, .. } = server_id_raw_fields.remove(0);
    let server_id = i32::from_str_radix(std::str::from_utf8(&server_id_raw).map_err(|_| LiveDataProcessorFailure::InvalidInput)?, 10).map_err(|_| LiveDataProcessorFailure::InvalidInput)?;

    let mut raw_fields = multipart_form_data.raw.remove("payload").ok_or(LiveDataProcessorFailure::InvalidInput)?;
    let RawField { content_type: _, file_name: _, raw } = raw_fields.remove(0);
    if raw.is_empty() {
        return Err(LiveDataProcessorFailure::InvalidInput);
    }
    let reader = std::io::Cursor::new(raw.as_slice());
    let mut zip = zip::ZipArchive::new(reader).map_err(|_| LiveDataProcessorFailure::InvalidZipFile)?;

    // Create Upload Id
    let upload_time = time_util::now();
    let upload_params = params!("member_id" => auth.0, "ts" => upload_time);
    db_main.0.execute_wparams("INSERT INTO `instance_uploads` (`member_id`, `timestamp`) VALUES (:member_id, :ts)", upload_params.clone());
    let upload_id: u32 = db_main.0.select_wparams_value("SELECT id FROM `instance_uploads` WHERE `member_id`=:member_id AND `timestamp`=:ts",
                                                        |mut row| row.take::<u32, usize>(0).unwrap(), upload_params).unwrap();

    let storage_path = std::env::var("INSTANCE_STORAGE_PATH").expect("storage path must be set");
    if std::fs::create_dir_all(&format!("{}/zips", storage_path)).is_ok() {
        if let Ok(mut saved_zip) = File::create(&format!("{}/zips/upload_{}.zip", storage_path, upload_id)) {
            let _ = saved_zip.write_all(&raw);
        }
    }

    // There should only be the combat log in there
    let file = zip.by_index(0).map_err(|_| LiveDataProcessorFailure::InvalidZipFile)?;
    let bytes = file.bytes().filter_map(|byte| byte.ok()).collect::<Vec<u8>>();
    let mut content = Vec::new();
    for slice in bytes.split(|c| *c == 10) {
        if let Ok(parsed_str) = std::str::from_utf8(slice) {
            content.push(parsed_str);
        }
    }
    let content = content.join("\n");

    if server_id == -1 {
        return parse(
            &me,
            WoWRetailClassicParser::new(),
            &mut *db_main,
            &data,
            &armory,
            &content,
            start_time_in_ms,
            end_time_in_ms,
            auth.0,
            upload_id
        );
    } else {
        let server = data.get_server(server_id as u32).unwrap();
        if server.expansion_id == 1 {
            return parse(
                &me,
                WoWVanillaParser::new(server_id as u32),
                &mut *db_main,
                &data,
                &armory,
                &content,
                start_time_in_ms,
                end_time_in_ms,
                auth.0,
                upload_id
            );
        } else if server.expansion_id == 2 {
            return parse(
                &me,
                WoWTBCParser::new(server_id as u32),
                &mut *db_main,
                &data,
                &armory,
                &content,
                start_time_in_ms,
                end_time_in_ms,
                auth.0,
                upload_id
            );
        } else if server.expansion_id == 3 {
            return parse(
                &me,
                WoWWOTLKParser::new(server_id as u32),
                &mut *db_main,
                &data,
                &armory,
                &content,
                start_time_in_ms,
                end_time_in_ms,
                auth.0,
                upload_id
            );
        }
    }

    Err(LiveDataProcessorFailure::InvalidInput)
}

#[openapi]
#[get("/upload/progress")]
pub fn get_upload_progress(me: State<LiveDataProcessor>, auth: Authenticate) -> Json<u8> {
    let upload_progress = me.upload_progress.read().unwrap();
    Json(*upload_progress.get(&auth.0).unwrap_or(&0))
}

fn parse(me: &LiveDataProcessor, mut parser: impl CombatLogParser, db_main: &mut (impl Select + Execute), data: &DataMaterial, armory: &Armory, content: &str, start_time: u64, end_time: u64, member_id: u32, upload_id: u32) -> Result<(), LiveDataProcessorFailure> {
    if let Some((server_id, messages)) = parse_cbl(&mut parser, &me, &mut *db_main, data, armory, content, start_time, end_time, member_id) {
        return me.process_messages(&mut *db_main, server_id as u32, &armory, &data, messages, member_id, upload_id);
    }
    Err(LiveDataProcessorFailure::InvalidInput)
}
