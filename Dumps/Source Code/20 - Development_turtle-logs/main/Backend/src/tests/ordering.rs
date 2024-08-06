use crate::util::ordering::NegateOrdExt;
use std::cmp::Ordering;

#[test]
fn test_negate_cond_equal() {
    let ordering = Ordering::Equal;
    assert_eq!(ordering.negate_cond(true), ordering);
    assert_eq!(ordering.negate_cond(false), ordering);
}

#[test]
fn test_negate_cond_less() {
    let ordering = Ordering::Less;
    assert_eq!(ordering.negate_cond(true), Ordering::Less);
    assert_eq!(ordering.negate_cond(false), Ordering::Greater);
}

#[test]
fn test_negate_cond_greater() {
    let ordering = Ordering::Greater;
    assert_eq!(ordering.negate_cond(true), Ordering::Greater);
    assert_eq!(ordering.negate_cond(false), Ordering::Less);
}
