use std::cmp::Ordering;

pub trait NegateOrdExt {
    fn negate_cond(&self, sorting: bool) -> Ordering;
}

impl NegateOrdExt for Ordering {
    fn negate_cond(&self, sorting: bool) -> Self {
        if *self == Ordering::Equal {
            return Ordering::Equal;
        }

        if *self == Ordering::Less {
            if sorting {
                return Ordering::Less;
            }
            return Ordering::Greater;
        }
        if sorting {
            return Ordering::Greater;
        }
        Ordering::Less
    }
}
