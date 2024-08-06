use crate::modules::live_data_processor::tools::GUID;

#[test]
fn test_is_unit_high_value_player() {
    let guid: u64 = 0;
    assert!(guid.is_unit());
    assert!(guid.is_player());
}

#[test]
fn test_is_unit_high_value_pet() {
    let guid: u64 = 17383894561650114560;
    assert!(guid.is_unit());
    assert!(guid.is_pet());
}

#[test]
fn test_is_unit_high_value_creature() {
    let guid: u64 = 17379390962022744064;
    assert!(guid.is_unit());
    assert!(guid.is_creature());
}

#[test]
fn test_is_unit_high_value_vehicle() {
    let guid: u64 = 17388398161277485056;
    assert!(guid.is_unit());
    assert!(guid.is_vehicle());
}
#[test]
fn test_is_unit_low_value_player() {
    let guid: u64 = 42;
    assert!(guid.is_unit());
    assert!(guid.is_player());
}

#[test]
fn test_is_unit_low_value_max_player() {
    let guid: u64 = 281474976710655;
    assert!(guid.is_unit());
    assert!(guid.is_player());
}

#[test]
fn test_is_unit_max_value() {
    let guid: u64 = 18446744073709551615;
    assert!(!guid.is_unit());
}

#[test]
fn test_is_unit_low_value_max_pet() {
    let guid: u64 = 17384176036626825215;
    assert!(guid.is_unit());
    assert!(guid.is_pet());
}

#[test]
fn test_is_unit_low_value_max_creature() {
    let guid: u64 = 17379672436999454719;
    assert!(guid.is_unit());
    assert!(guid.is_creature());
}

#[test]
fn test_is_unit_low_value_max_vehicle() {
    let guid: u64 = 17388679636254195711;
    assert!(guid.is_unit());
    assert!(guid.is_vehicle());
}

#[test]
fn test_is_unit_low_value_middle_pet() {
    let guid: u64 = 17383894561650114602;
    assert!(guid.is_unit());
    assert!(guid.is_pet());
}

#[test]
fn test_is_unit_low_value_middle_creature() {
    let guid: u64 = 17379390962022744106;
    assert!(guid.is_unit());
    assert!(guid.is_creature());
}

#[test]
fn test_is_unit_low_value_middle_vehicle() {
    let guid: u64 = 17388398161277485098;
    assert!(guid.is_unit());
    assert!(guid.is_vehicle());
}

#[test]
fn test_get_entry_none() {
    let guid: u64 = 0;
    assert_eq!(guid.get_entry(), None);
}
