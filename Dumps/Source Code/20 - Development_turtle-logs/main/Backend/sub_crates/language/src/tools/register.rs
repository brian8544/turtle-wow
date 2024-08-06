extern crate dotenv;

use strum::EnumCount;

use crate::domain_value::Language;
use crate::material::Dictionary;

use self::dotenv::dotenv;

pub trait Register {
    fn register(&self, key: &str, language: Language, value: &str);
}

impl Register for Dictionary {
    fn register(&self, key: &str, language: Language, value: &str) {
        let mut lang_table = self.table.write().unwrap();
        let key_str: String = String::from(key);
        let mut value_str: String = String::from(value);
        // Replacing environmental variables
        dotenv().ok();
        for (key, val) in dotenv::vars() {
            value_str = value_str.replace(&format!("{{{env_key}}}", env_key = key), &val);
        }
        let lang_index = language as usize;
        if !lang_table.contains_key(&key_str) {
            lang_table.insert(String::from(&key_str), vec![None; Language::COUNT]);
        }
        let vec = lang_table.get_mut(&key_str).unwrap();
        match &vec[lang_index] {
            Some(_) => {
                panic!("{} is overwritten for the language {} with the content {}!", key, lang_index, value);
            },
            None => vec[lang_index] = Some(value_str),
        }
    }
}
