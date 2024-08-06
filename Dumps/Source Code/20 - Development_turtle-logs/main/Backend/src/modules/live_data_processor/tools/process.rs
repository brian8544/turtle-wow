use crate::modules::armory::Armory;
use crate::modules::data::Data;
use crate::modules::live_data_processor::dto::{LiveDataProcessorFailure, Message};
use crate::modules::live_data_processor::tools::MessageParser;
use crate::modules::live_data_processor::LiveDataProcessor;
use crate::util::database::{Execute, Select};

pub trait ProcessMessages {
    fn parse_messages(&self, db_main: &mut (impl Select + Execute), server_id: u32, armory: &Armory, data: &Data, messages: Vec<Vec<u8>>, member_id: u32) -> Result<(), LiveDataProcessorFailure>;
    fn process_messages(&self, db_main: &mut (impl Select + Execute), server_id: u32, armory: &Armory, data: &Data, msg_vec: Vec<Message>, member_id: u32, upload_id: u32) -> Result<(), LiveDataProcessorFailure>;
}

impl ProcessMessages for LiveDataProcessor {
    fn parse_messages(&self, db_main: &mut (impl Select + Execute), server_id: u32, armory: &Armory, data: &Data, messages: Vec<Vec<u8>>, member_id: u32) -> Result<(), LiveDataProcessorFailure> {
        let msg_vec = messages.iter().map(|msg| msg.parse_message()).filter(|res| res.is_ok()).map(|msg_res| msg_res.unwrap()).collect::<Vec<Message>>();
        self.process_messages(db_main, server_id, armory, data, msg_vec, member_id, 0) // TODO
    }

    fn process_messages(&self, db_main: &mut (impl Select + Execute), server_id: u32, armory: &Armory, data: &Data, msg_vec: Vec<Message>, member_id: u32, upload_id: u32) -> Result<(), LiveDataProcessorFailure> {
        if !msg_vec.is_empty() {
            self.create_server_if_not_exist(db_main, server_id);
            let servers = self.servers.read().unwrap();
            let mut server = servers.get(&server_id).expect("Server Id must exist!").write().unwrap();
            return server.parse_events(db_main, armory, data, msg_vec, member_id, upload_id);
        }

        Ok(())
    }
}
