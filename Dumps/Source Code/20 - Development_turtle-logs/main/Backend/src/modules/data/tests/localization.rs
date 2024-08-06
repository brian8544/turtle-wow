use crate::modules::data::domain_value::Localization;
use crate::modules::data::{tools::RetrieveLocalization, Data};
use std::collections::HashMap;

#[test]
fn get_localization() {
    let mut data = Data::default();
    let language_id = 1;
    let localization_id = 1;
    let localization = Localization {
        id: localization_id,
        language_id,
        content: "fsdsd".to_string(),
    };

    let mut hashmap = HashMap::new();
    hashmap.insert(localization_id, localization.clone());
    data.localization.push(hashmap);

    let localization_res = data.get_localization(language_id, localization_id);
    assert!(localization_res.is_some());
    assert_eq!(localization_res.unwrap(), localization);
    let no_localization = data.get_localization(0, 0);
    assert!(no_localization.is_none());
}
