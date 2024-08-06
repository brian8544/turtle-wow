use crate::modules::data::domain_value::Title;
use crate::modules::data::{tools::RetrieveTitle, Data};

#[test]
fn get_title() {
    let mut data = Data::default();
    let title_id = 1;
    let title = Title { id: title_id, localization_id: 32423 };
    data.titles.insert(title_id, title.clone());

    let title_res = data.get_title(title_id);
    assert!(title_res.is_some());
    assert_eq!(title_res.unwrap(), title);
    let no_title = data.get_title(0);
    assert!(no_title.is_none());
}

#[test]
fn get_all_titles() {
    let data = Data::default();
    let titles = data.get_all_titles();
    assert!(titles.is_empty());
}
