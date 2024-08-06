use crate::modules::data::{domain_value::Localization, Data};

pub trait RetrieveLocalization {
    fn get_localization(&self, language_id: u8, localization_id: u32) -> Option<Localization>;
}

impl RetrieveLocalization for Data {
    fn get_localization(&self, language_id: u8, localization_id: u32) -> Option<Localization> {
        if language_id == 0 {
            return None;
        }

        self.localization.get(language_id as usize - 1).and_then(|map| map.get(&localization_id).cloned())
    }
}
