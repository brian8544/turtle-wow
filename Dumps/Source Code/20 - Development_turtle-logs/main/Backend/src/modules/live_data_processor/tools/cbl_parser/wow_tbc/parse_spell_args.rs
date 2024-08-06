pub fn parse_spell_args(message_args: &[&str]) -> Option<u32> {
    let spell_id = u32::from_str_radix(message_args[0], 10).ok()?;
    // let school_mask = u8::from_str_radix(spell_args[2].trim_start_matches("0x"), 16).ok()?;
    Some(spell_id)
}
