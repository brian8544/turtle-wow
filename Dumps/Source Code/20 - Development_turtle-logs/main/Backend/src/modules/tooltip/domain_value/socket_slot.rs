use crate::modules::tooltip::domain_value::SocketSlotItem;

#[derive(Debug, Clone, Serialize, JsonSchema)]
pub struct SocketSlot {
    pub flag: u8,
    pub item: Option<SocketSlotItem>,
}
