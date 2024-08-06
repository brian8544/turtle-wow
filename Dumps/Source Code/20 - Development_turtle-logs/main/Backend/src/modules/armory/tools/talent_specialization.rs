// Check if this breakdown is effectively null, i.e. 000|000|000
pub fn strip_talent_specialization(spec: &Option<String>) -> Option<String> {
    if let Some(spec_str) = spec {
        if spec_str.split('|').map(|spec| spec.chars().map(|talent| talent.to_digit(10).unwrap()).sum::<u32>()).sum::<u32>() > 0 {
            spec.clone()
        } else {
            None
        }
    } else {
        None
    }
}
