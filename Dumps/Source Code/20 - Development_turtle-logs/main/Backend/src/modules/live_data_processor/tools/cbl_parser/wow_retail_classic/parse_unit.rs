use crate::modules::live_data_processor::dto::Unit;
use crate::modules::live_data_processor::tools::GUID;

pub fn parse_unit(message_args: &[&str]) -> Option<Unit> {
    let mut unit_id: u64;
    let unit_params = message_args[0].split('-').collect::<Vec<&str>>();
    match unit_params[0] {
        "Player" => {
            unit_id = u64::from_str_radix(unit_params[2], 16).ok()?;
        },
        // Ignore GameObject and Vignette
        "Pet" | "Vehicle" => {
            let spawn_uid = u64::from_str_radix(unit_params[6], 16).ok()?;
            let npc_id = u64::from_str_radix(unit_params[5], 10).ok()?;
            unit_id = 0;
            unit_id |= 0xF140000000000000;
            unit_id |= npc_id << 24;
            unit_id |= spawn_uid & 0x0000000000FFFFFF;
        },
        "Creature" => {
            let spawn_uid = u64::from_str_radix(unit_params[6], 16).ok()?;
            let npc_id = u64::from_str_radix(unit_params[5], 10).ok()?;
            unit_id = 0;
            unit_id |= 0xF130000000000000;
            unit_id |= npc_id << 24;
            unit_id |= spawn_uid & 0x0000000000FFFFFF;
        },
        _ => return None,
    };
    Some(Unit { is_player: unit_id.is_player(), unit_id })
}
