use crate::modules::data::domain_value::Icon;
use crate::modules::data::{tools::RetrieveIcon, Data};

#[test]
fn get_icon() {
    let mut data = Data::default();
    let icon_id = 32;
    let icon = Icon { id: icon_id, name: "sdfgsghdsf".to_string() };
    data.icons.insert(icon_id, icon.clone());

    let icon_res = data.get_icon(icon_id);
    assert!(icon_res.is_some());
    assert_eq!(icon_res.unwrap(), icon);
    let no_icon = data.get_icon(0);
    assert!(no_icon.is_none());
}
