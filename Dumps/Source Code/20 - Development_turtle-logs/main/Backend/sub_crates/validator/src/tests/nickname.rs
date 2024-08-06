#[cfg(test)]
mod tests {
    use crate::tools::valid_nickname;

    #[test]
    fn invalid_nickname() {
        let nickname = "NickName NickName";
        let nickname2 = ".";
        let nickname3 = "@";
        assert!(!valid_nickname(nickname));
        assert!(!valid_nickname(nickname2));
        assert!(!valid_nickname(nickname3));
    }

    #[test]
    fn valid_nickname_test() {
        let nickname = "NickName";
        assert!(valid_nickname(nickname));
    }
}
