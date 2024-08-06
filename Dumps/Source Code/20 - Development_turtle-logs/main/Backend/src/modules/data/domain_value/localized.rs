#[derive(Debug, Clone, Serialize, JsonSchema)]
pub struct Localized<T> {
    pub base: T,
    pub localization: String,
}
