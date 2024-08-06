#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct SelectOption<T> {
    pub value: T,
    pub label_key: String,
}
