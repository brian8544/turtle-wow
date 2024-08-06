use crate::modules::live_data_processor::domain_value::HitType;

pub fn parse_miss(message_args: &[&str]) -> Option<u32> {
    Some(match message_args[0] {
        "ABSORB" => HitType::FullAbsorb,
        "RESIST" => HitType::FullResist,
        "BLOCK" => HitType::FullBlock,
        "DEFLECT" => HitType::Deflect,
        "DODGE" => HitType::Dodge,
        "EVADE" => HitType::Evade,
        "IMMUNE" => HitType::Immune,
        "MISS" => HitType::Miss,
        "PARRY" => HitType::Parry,
        "REFLECT" => HitType::Reflect,
        _ => return None,
    } as u32)
}
