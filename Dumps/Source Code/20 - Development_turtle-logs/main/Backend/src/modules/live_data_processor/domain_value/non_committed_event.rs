use crate::modules::live_data_processor::dto::Message;
use std::collections::VecDeque;

pub type NonCommittedEvent = VecDeque<Message>;
