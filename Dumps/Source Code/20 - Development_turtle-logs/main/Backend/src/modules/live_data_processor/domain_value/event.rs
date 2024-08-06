use crate::modules::live_data_processor::domain_value::{EventType, Unit};

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct Event {
    pub id: u32,
    pub timestamp: u64,
    pub subject: Unit,
    pub event: EventType,
    #[serde(skip)]
    pub message_count: u64,
}

impl Event {
    pub fn new(message_count: u64, timestamp: u64, subject: Unit, event: EventType) -> Self {
        Event {
            id: 0,
            timestamp,
            subject,
            event,
            message_count,
        }
    }
}
