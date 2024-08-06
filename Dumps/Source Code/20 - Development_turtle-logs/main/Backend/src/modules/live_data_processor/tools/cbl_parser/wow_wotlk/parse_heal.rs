pub fn parse_heal(message_args: &[&str]) -> Option<(u32, u32, u32, bool)> {
    let amount = u32::from_str_radix(message_args[0], 10).ok()?;
    let overhealing = u32::from_str_radix(message_args[1], 10).ok()?;
    // TODO: Use as absorbed hint
    let absorbed = u32::from_str_radix(message_args[2], 10).ok()?;
    let critical = message_args[3].starts_with('1');
    Some((amount, overhealing, absorbed, critical))
}
