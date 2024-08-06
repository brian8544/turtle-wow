use crate::modules::live_data_processor::dto::Unit;
use crate::modules::live_data_processor::tools::GUID;

pub fn parse_unit(message_args: &[&str]) -> Option<Unit> {
    let mut unit_id = u64::from_str_radix(message_args[0].trim_start_matches("0x"), 16).ok()?;

    // Crystalsong UID fix
    if unit_id.get_high() == 0x0110 {
        unit_id &= 0x0000000000FFFFFF;
    }

    // Each non npc pet gets the id 0xFFFF (Has flags 0xF140)
    if unit_id.is_pet() {
        let mut new_unit_id = unit_id;
        new_unit_id = (new_unit_id & 0x000000FFFF000000).rotate_right(24);
        new_unit_id |= 0x000000FFFF000000;
        new_unit_id |= 0xF140000000000000;
        unit_id = new_unit_id;
    }
    Some(Unit { is_player: unit_id.is_player(), unit_id })
}
