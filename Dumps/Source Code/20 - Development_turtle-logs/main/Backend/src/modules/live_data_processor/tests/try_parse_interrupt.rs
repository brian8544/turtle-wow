use crate::modules::live_data_processor::domain_value::{AuraApplication, Creature, Event, EventType, HitType, SpellCast, Unit};
use crate::modules::live_data_processor::tools::server::try_parse_interrupt;
use std::collections::VecDeque;

#[test]
fn test_no_events() {
    let subject = Unit::Creature(Creature { creature_id: 0, entry: 0, owner: None });

    let result = try_parse_interrupt(&VecDeque::new(), &subject);
    assert!(result.is_err());
}

#[test]
fn test_timestamp() {
    let event_subject = Unit::Creature(Creature { creature_id: 0, entry: 0, owner: None });
    let spell_cast = SpellCast {
        victim: None,
        hit_mask: vec![HitType::Crit],
        spell_id: 0,
        school_mask: Vec::new(),
    };
    let event_type = EventType::SpellCast(spell_cast);
    let committed_event = Event::new(0, 123456, event_subject, event_type);

    let subject = Unit::Creature(Creature { creature_id: 0, entry: 0, owner: None });

    let result = try_parse_interrupt(&VecDeque::from(vec![committed_event]), &subject);
    assert!(result.is_err());
}

#[test]
fn test_spellcast_no_spell_id() {
    let event_subject = Unit::Creature(Creature { creature_id: 0, entry: 0, owner: None });
    let spell_cast = SpellCast {
        victim: None,
        hit_mask: vec![HitType::Crit],
        spell_id: 0,
        school_mask: Vec::new(),
    };
    let event_type = EventType::SpellCast(spell_cast);
    let committed_event = Event::new(0, 123456, event_subject, event_type);

    let subject = Unit::Creature(Creature { creature_id: 0, entry: 0, owner: None });

    let result = try_parse_interrupt(&VecDeque::from(vec![committed_event]), &subject);
    assert!(result.is_err());
}

#[test]
fn test_spellcast_different_victim_no_direct_interrupt() {
    let event_subject = Unit::Creature(Creature { creature_id: 0, entry: 0, owner: None });
    let victim = Unit::Creature(Creature { creature_id: 2, entry: 2, owner: None });
    let spell_cast = SpellCast {
        victim: Some(victim),
        hit_mask: vec![HitType::Crit],
        spell_id: 73,
        school_mask: Vec::new(),
    };
    let event_type = EventType::SpellCast(spell_cast);
    let committed_event = Event::new(0, 123456, event_subject, event_type);

    let subject = Unit::Creature(Creature { creature_id: 1, entry: 1, owner: None });

    let result = try_parse_interrupt(&VecDeque::from(vec![committed_event]), &subject);
    assert!(result.is_err());
}

#[test]
fn test_spellcast_hit_victim_no_direct_interrupt() {
    let event_subject = Unit::Creature(Creature { creature_id: 0, entry: 0, owner: None });
    let victim = Unit::Creature(Creature { creature_id: 1, entry: 1, owner: None });
    let spell_cast = SpellCast {
        victim: Some(victim),
        hit_mask: vec![HitType::Crit],
        spell_id: 73,
        school_mask: Vec::new(),
    };
    let event_type = EventType::SpellCast(spell_cast);
    let committed_event = Event::new(0, 123456, event_subject, event_type);

    let subject = Unit::Creature(Creature { creature_id: 1, entry: 1, owner: None });

    let result = try_parse_interrupt(&VecDeque::from(vec![committed_event]), &subject);
    assert!(result.is_err());
}

#[test]
fn test_spellcast_different_victim_direct_interrupt() {
    let event_subject = Unit::Creature(Creature { creature_id: 0, entry: 0, owner: None });
    let victim = Unit::Creature(Creature { creature_id: 2, entry: 2, owner: None });
    let spell_cast = SpellCast {
        victim: Some(victim),
        hit_mask: vec![HitType::Crit],
        spell_id: 72,
        school_mask: Vec::new(),
    };
    let event_type = EventType::SpellCast(spell_cast);
    let committed_event = Event::new(0, 123456, event_subject, event_type);

    let subject = Unit::Creature(Creature { creature_id: 1, entry: 1, owner: None });

    let result = try_parse_interrupt(&VecDeque::from(vec![committed_event]), &subject);
    assert!(result.is_err());
}

#[test]
fn test_spellcast_hit_victim_direct_interrupt() {
    let event_subject = Unit::Creature(Creature { creature_id: 0, entry: 0, owner: None });
    let victim = Unit::Creature(Creature { creature_id: 1, entry: 1, owner: None });
    let spell_cast = SpellCast {
        victim: Some(victim),
        hit_mask: vec![HitType::Crit],
        spell_id: 72,
        school_mask: Vec::new(),
    };
    let event_type = EventType::SpellCast(spell_cast);
    let committed_event = Event::new(0, 123456, event_subject, event_type);

    let subject = Unit::Creature(Creature { creature_id: 1, entry: 1, owner: None });

    let result = try_parse_interrupt(&VecDeque::from(vec![committed_event]), &subject);
    assert!(result.is_ok());
}

#[test]
fn test_aura_app_wrong_subject_no_indirect_interrupt() {
    let event_subject = Unit::Creature(Creature { creature_id: 0, entry: 0, owner: None });
    let aura_caster = Unit::Creature(Creature { creature_id: 2, entry: 2, owner: None });
    let aura_application = AuraApplication {
        caster: aura_caster,
        stack_amount: 0,
        spell_id: 407,
        school_mask: Vec::new(),
    };
    let event_type = EventType::AuraApplication(aura_application);
    let committed_event = Event::new(0, 123456, event_subject, event_type);

    let subject = Unit::Creature(Creature { creature_id: 1, entry: 1, owner: None });

    let result = try_parse_interrupt(&VecDeque::from(vec![committed_event]), &subject);
    assert!(result.is_err());
}

#[test]
fn test_aura_app_correct_subject_no_indirect_interrupt() {
    let event_subject = Unit::Creature(Creature { creature_id: 1, entry: 1, owner: None });
    let aura_caster = Unit::Creature(Creature { creature_id: 2, entry: 2, owner: None });
    let aura_application = AuraApplication {
        caster: aura_caster,
        stack_amount: 0,
        spell_id: 407,
        school_mask: Vec::new(),
    };
    let event_type = EventType::AuraApplication(aura_application);
    let committed_event = Event::new(0, 123456, event_subject, event_type);

    let subject = Unit::Creature(Creature { creature_id: 1, entry: 1, owner: None });

    let result = try_parse_interrupt(&VecDeque::from(vec![committed_event]), &subject);
    assert!(result.is_err());
}

#[test]
fn test_aura_app_wrong_subject_indirect_interrupt() {
    let event_subject = Unit::Creature(Creature { creature_id: 0, entry: 0, owner: None });
    let aura_caster = Unit::Creature(Creature { creature_id: 2, entry: 2, owner: None });
    let aura_application = AuraApplication {
        caster: aura_caster,
        stack_amount: 0,
        spell_id: 408,
        school_mask: Vec::new(),
    };
    let event_type = EventType::AuraApplication(aura_application);
    let committed_event = Event::new(0, 123456, event_subject, event_type);

    let subject = Unit::Creature(Creature { creature_id: 1, entry: 1, owner: None });

    let result = try_parse_interrupt(&VecDeque::from(vec![committed_event]), &subject);
    assert!(result.is_err());
}

#[test]
fn test_aura_app_correct_subject_indirect_interrupt() {
    let event_subject = Unit::Creature(Creature { creature_id: 1, entry: 1, owner: None });
    let aura_caster = Unit::Creature(Creature { creature_id: 2, entry: 2, owner: None });
    let aura_application = AuraApplication {
        caster: aura_caster,
        stack_amount: 0,
        spell_id: 408,
        school_mask: Vec::new(),
    };
    let event_type = EventType::AuraApplication(aura_application);
    let committed_event = Event::new(0, 123456, event_subject, event_type);

    let subject = Unit::Creature(Creature { creature_id: 1, entry: 1, owner: None });

    let result = try_parse_interrupt(&VecDeque::from(vec![committed_event]), &subject);
    assert!(result.is_ok());
}

#[test]
fn test_unhandled_event() {
    let event_subject = Unit::Creature(Creature { creature_id: 0, entry: 0, owner: None });
    let event_type = EventType::ThreatWipe;
    let committed_event = Event::new(0, 123456, event_subject, event_type);

    let subject = Unit::Creature(Creature { creature_id: 1, entry: 1, owner: None });

    let result = try_parse_interrupt(&VecDeque::from(vec![committed_event]), &subject);
    assert!(result.is_err());
}
