#[derive(Debug, Clone, Serialize, JsonSchema, PartialEq)]
pub struct Icon {
    pub id: u16,
    pub name: String,
}
