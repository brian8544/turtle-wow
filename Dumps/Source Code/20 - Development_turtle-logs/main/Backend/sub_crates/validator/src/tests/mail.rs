#[cfg(test)]
mod tests {
    use crate::tools::valid_mail;

    #[test]
    fn invalid_mail() {
        let mail = "Test@bla";
        assert!(!valid_mail(mail));
    }

    #[test]
    fn valid_mail_test() {
        let mail = "Test.Test@bla.de";
        assert!(valid_mail(mail));
    }

    #[test]
    fn valid_mail_test_underscore() {
        let mail = "Test_Test@bla.de";
        assert!(valid_mail(mail));
    }
}
