use crate::modules::live_data_processor::domain_value::HitType;
use crate::modules::live_data_processor::dto::DamageComponent;

pub fn parse_damage(message_args: &[&str]) -> Option<(u32, u32, DamageComponent)> {
    let amount = u32::from_str_radix(message_args[0], 10).ok()?;
    // Ignore overkill for now
    let school_mask = u8::from_str_radix(message_args[2], 10).ok()?;
    let resisted = u32::from_str_radix(message_args[3], 10).ok()?;
    let blocked = u32::from_str_radix(message_args[4], 10).ok()?;
    let absorbed = u32::from_str_radix(message_args[5], 10).ok()?;
    let critical = message_args[6].starts_with('1');
    let glancing = message_args[7].starts_with('1');
    let crushing = message_args[8].starts_with('1');
    // Not in Classic
    // let is_off_hand = message_args[9].starts_with('1');
    let mut hit_mask = 0;
    if critical {
        hit_mask |= HitType::Crit as u32;
    } else {
        hit_mask |= HitType::Hit as u32;
    }
    if glancing {
        hit_mask |= HitType::Glancing as u32;
    }
    if crushing {
        hit_mask |= HitType::Crushing as u32;
    }
    //if is_off_hand {
    //    hit_mask |= HitType::OffHand as u32;
    //}
    if resisted > 0 {
        hit_mask |= HitType::PartialResist as u32;
    }
    if blocked > 0 {
        hit_mask |= HitType::PartialBlock as u32;
    }
    if absorbed > 0 {
        hit_mask |= HitType::PartialAbsorb as u32;
    }

    Some((
        hit_mask,
        blocked,
        DamageComponent {
            school_mask,
            damage: amount,
            resisted_or_glanced: resisted,
            absorbed,
        },
    ))
}
