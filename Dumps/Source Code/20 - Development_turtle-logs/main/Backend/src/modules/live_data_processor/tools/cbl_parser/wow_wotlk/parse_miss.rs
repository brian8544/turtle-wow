use crate::modules::live_data_processor::domain_value::{HitType, School};
use crate::modules::live_data_processor::dto::DamageComponent;

pub fn parse_miss(message_args: &[&str]) -> Option<(u32, u32, Option<DamageComponent>)> {
    let amount_missed = if message_args.len() == 2 { u32::from_str_radix(message_args[1], 10).ok()? } else { 0 };
    Some(match message_args[0] {
        "ABSORB" => (
            HitType::FullAbsorb as u32,
            0,
            Some(DamageComponent {
                school_mask: School::Physical as u8,
                damage: 0,
                resisted_or_glanced: 0,
                absorbed: amount_missed,
            }),
        ),
        "RESIST" => (
            HitType::FullResist as u32,
            0,
            Some(DamageComponent {
                school_mask: School::Physical as u8,
                damage: 0,
                resisted_or_glanced: amount_missed,
                absorbed: 0,
            }),
        ),
        "BLOCK" => (HitType::FullBlock as u32, amount_missed, None),
        "DEFLECT" => (HitType::Deflect as u32, 0, None),
        "DODGE" => (HitType::Dodge as u32, 0, None),
        "EVADE" => (HitType::Evade as u32, 0, None),
        "IMMUNE" => (HitType::Immune as u32, 0, None),
        "MISS" => (HitType::Miss as u32, 0, None),
        "PARRY" => (HitType::Parry as u32, 0, None),
        "REFLECT" => (HitType::Reflect as u32, 0, None),
        _ => return None,
    })
}
