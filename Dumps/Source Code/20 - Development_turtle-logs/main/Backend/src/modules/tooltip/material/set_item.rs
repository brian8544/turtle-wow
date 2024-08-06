#[derive(Debug, Clone, Serialize, JsonSchema)]
pub struct SetItem {
    pub item_id: u32,
    pub active: bool,
    pub name: String,
    pub item_level: u16,
    pub inventory_type: u8,
}

impl PartialEq for SetItem {
    fn eq(&self, other: &Self) -> bool {
        self.item_id == other.item_id && self.active == other.active && self.name == other.name && self.item_level == other.item_level && self.inventory_type == other.inventory_type
    }
}
