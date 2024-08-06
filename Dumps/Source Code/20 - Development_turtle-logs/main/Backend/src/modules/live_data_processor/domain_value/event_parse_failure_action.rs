#[derive(Debug)]
pub enum EventParseFailureAction {
    DiscardFirst,
    Wait,
    PrependNext,
}
