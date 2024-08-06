// use pwned::api::*;

use crate::domain_value::PasswordFailure;

pub fn valid_password(input: &str) -> Result<(), PasswordFailure> {
    // lazy_static! {
    //     static ref PWNED: Pwned = PwnedBuilder::default()
    //         .pad_password_responses(true)
    //         .api_key(std::env::var("HIBP_API_KEY").expect("HIBP_API_KEY environment variable not found!"))
    //         .build()
    //         .unwrap();
    // }

    if !input.chars().all(|character| character.is_alphanumeric() || "+#'.:,;<>@|!\"§$%&/()=?`'\\[]{}^°*~-_".chars().any(|extra| extra == character)) {
        return Err(PasswordFailure::InvalidCharacters);
    }

    if input.chars().count() < 12 {
        return Err(PasswordFailure::TooFewCharacters);
    }

    // match PWNED.check_password(input) {
    //     Ok(pwd) => {
    //         if pwd.count == 0 {
    //             return Ok(());
    //         }
    //         Err(PasswordFailure::Pwned(pwd.count))
    //     },
    //     // Ignore this case
    //     Err(_) => Ok(()),
    // }
    Ok(())
}
