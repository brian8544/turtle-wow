pub enum PasswordFailure {
    TooFewCharacters,
    InvalidCharacters,
    Pwned(u64),
}
