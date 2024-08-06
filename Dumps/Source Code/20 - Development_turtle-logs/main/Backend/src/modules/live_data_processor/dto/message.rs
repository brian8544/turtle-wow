use crate::modules::live_data_processor::dto::MessageType;

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema, PartialEq)]
pub struct Message {
    pub api_version: u8,
    pub message_length: u8,
    pub timestamp: u64,
    pub message_count: u64,
    pub message_type: MessageType,
}

impl Message {
    pub fn new_parsed(timestamp: u64, message_count: u64, message_type: MessageType) -> Self {
        Message {
            api_version: 0,
            message_length: 0,
            timestamp,
            message_count,
            message_type,
        }
    }
}
