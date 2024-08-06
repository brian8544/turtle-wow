use crate::modules::data::domain_value::Language;
use crate::modules::data::{tools::RetrieveLanguage, Data};

#[test]
fn get_language() {
    let mut data = Data::default();
    let language_id = 1;
    let language = Language {
        id: language_id,
        name: "sdfsd".to_string(),
        short_code: "sdfsd".to_string(),
    };
    data.languages.insert(language_id, language.clone());

    let language_res = data.get_language(language_id);
    assert!(language_res.is_some());
    assert_eq!(language_res.unwrap(), language);
    let no_language = data.get_language(0);
    assert!(no_language.is_none());
}

#[test]
fn get_all_languages() {
    let data = Data::default();
    let languages = data.get_all_languages();
    assert!(languages.is_empty());
}
