use crate::modules::data::domain_value::ItemStat;
use crate::modules::data::{tools::RetrieveItemStat, Data, Stat};
use std::collections::HashMap;

#[test]
fn get_item_stats() {
    let mut data = Data::default();
    let expansion_id = 1;
    let item_id = 940;
    let item_stat = ItemStat {
        id: 32142,
        expansion_id,
        item_id,
        stat: Stat { stat_type: 11, stat_value: 12 },
    };
    let mut hashmap = HashMap::new();
    hashmap.insert(item_id, vec![item_stat.clone()]);
    data.item_stats.push(hashmap);

    let item_stats = data.get_item_stats(expansion_id, item_id);
    assert!(item_stats.is_some());
    let item_stats_vec = item_stats.unwrap();
    assert!(!item_stats_vec.is_empty());
    assert_eq!(item_stats_vec[0], item_stat);
    let no_item_stats = data.get_item_stats(0, 0);
    assert!(no_item_stats.is_none());
}
