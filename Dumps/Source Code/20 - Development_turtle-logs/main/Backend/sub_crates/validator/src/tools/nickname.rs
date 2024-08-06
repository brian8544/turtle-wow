use regex::Regex;

pub fn valid_nickname(input: &str) -> bool {
    lazy_static! {
        static ref RE: Regex = Regex::new(r"[a-zA-Z0-9]+").unwrap();
        static ref RE_WS: Regex = Regex::new(r"^\S+$").unwrap();
    }
    RE_WS.is_match(input) && RE.is_match(input)
}
