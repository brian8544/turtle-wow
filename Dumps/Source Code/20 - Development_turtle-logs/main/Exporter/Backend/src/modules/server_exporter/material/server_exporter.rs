use std::sync::mpsc::Sender;

pub struct ServerExporter {
    pub sender_message: Option<Sender<(Vec<u32>, Vec<u8>)>>,
}

impl Default for ServerExporter {
    fn default() -> Self {
        ServerExporter { sender_message: None }
    }
}

impl ServerExporter {
    pub fn init(self) -> Self {
        self
    }
}
