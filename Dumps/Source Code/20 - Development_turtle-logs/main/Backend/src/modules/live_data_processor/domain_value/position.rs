#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct Position {
    pub x: i32,
    pub y: i32,
    pub z: i32,
    pub orientation: i32,
}
