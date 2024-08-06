use crate::modules::tooltip::domain_value::SocketSlot;

#[derive(Debug, Clone, Serialize, JsonSchema)]
pub struct Socket {
    pub socket_bonus: String,
    pub slots: Vec<SocketSlot>,
}
