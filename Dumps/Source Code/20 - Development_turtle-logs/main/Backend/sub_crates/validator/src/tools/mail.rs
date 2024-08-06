use regex::Regex;

pub fn valid_mail(input: &str) -> bool {
    lazy_static! {
        static ref RE: Regex = Regex::new(r"^([\w+\._]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$").unwrap();
    }
    input.chars().all(|c| c.is_alphanumeric() || c == '@' || c == '.' || c == '_') && RE.is_match(input)
}
