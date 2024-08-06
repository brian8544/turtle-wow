#[macro_export]
macro_rules! rpll_table_sort {
    ( $( ($filter:expr, $left:expr, $right:expr) ),* ) => {
        {
            $(
                {
                    if let Some(sorting) = $filter.sorting {
                        if $left.is_some() {
                            if $right.is_some() {
                                let ordering = $left.unwrap().cmp(&$right.unwrap()).negate_cond(sorting);
                                if ordering != Ordering::Equal {
                                    return ordering;
                                }
                            } else {
                                return Ordering::Less;
                            }
                        } else {
                            return Ordering::Greater;
                        }
                    }
                }
            )*
            Ordering::Equal
        }
    };
}
