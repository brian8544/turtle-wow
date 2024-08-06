pub fn get_talent_tree(talent_str: &str) -> u8 {
    talent_str
        .split('|')
        .collect::<Vec<&str>>()
        .into_iter()
        .map(|tree_str| tree_str.chars().map(|chr| chr.to_digit(10).unwrap()).sum::<u32>())
        .enumerate()
        .max_by(|(_, left), (_, right)| left.cmp(right))
        .unwrap()
        .0 as u8
}
