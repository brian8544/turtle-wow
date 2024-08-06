#[cfg(test)]
mod tests {
    extern crate dotenv;
    extern crate proptest;
    use self::dotenv::dotenv;
    use self::proptest::prelude::*;
    use crate::tools::valid_password;
    #[test]
    fn password_too_short() {
        dotenv().ok();
        let pass = "tooshort";
        assert!(valid_password(pass).is_err());
    }

    #[test]
    fn password_has_been_pwned() {
        dotenv().ok();
        let pass = "Password123456";
        assert!(valid_password(pass).is_err());
    }

    #[test]
    fn password_is_secure_enough() {
        dotenv().ok();
        let pass = "Password123456Password123456Password123456";
        assert!(valid_password(&pass).is_ok());
    }

    proptest! {
      #[test]
      fn never_crashes(pass in "\\PC*") {
        let _ = valid_password(&pass);
      }

      #[test]
      fn reject_arbitrary_too_short_passwords(pass in "\\PC{0,11}") {
        assert!(valid_password(&pass).is_err());
      }
    }
}
