use crate::modules::data::domain_value::Expansion;
use crate::modules::data::{tools::RetrieveExpansion, Data};

#[test]
fn get_expansion() {
    let mut data = Data::default();
    let expansion_id = 1;
    let expansion = Expansion { id: expansion_id, localization_id: 422 };
    data.expansions.insert(expansion_id, expansion.clone());

    let expansion_res = data.get_expansion(expansion_id);
    assert!(expansion_res.is_some());
    assert_eq!(expansion_res.unwrap(), expansion);
    let no_expansion = data.get_expansion(0);
    assert!(no_expansion.is_none());
}

#[test]
fn get_all_expansions() {
    let data = Data::default();
    let expansions = data.get_all_expansions();
    assert!(expansions.is_empty());
}
