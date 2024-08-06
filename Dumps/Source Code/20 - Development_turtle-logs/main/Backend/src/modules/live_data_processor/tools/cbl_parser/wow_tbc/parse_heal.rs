pub fn parse_heal(message_args: &[&str]) -> Option<(u32, bool)> {
    let amount = u32::from_str_radix(message_args[0], 10).ok()?;
    let critical = message_args[1].starts_with('1');
    Some((amount, critical))
}
