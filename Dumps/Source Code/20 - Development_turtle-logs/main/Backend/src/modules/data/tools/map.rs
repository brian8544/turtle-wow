use crate::modules::data::domain_value::Map;
use crate::modules::data::tools::RetrieveLocalization;
use crate::modules::data::Data;

pub trait RetrieveMap {
    fn get_map(&self, id: u16) -> Option<Map>;
    fn get_all_maps(&self) -> Vec<Map>;
    fn get_map_by_name(&self, name: &String) -> Option<Map>;
}

impl RetrieveMap for Data {
    fn get_map(&self, id: u16) -> Option<Map> {
        self.maps.get(&id).cloned()
    }

    fn get_all_maps(&self) -> Vec<Map> {
        self.maps.iter().map(|(_, map)| map.clone()).collect()
    }

    fn get_map_by_name(&self, name: &String) -> Option<Map> {
        self.maps.iter().find_map(|(_, map)| {
            if self.get_localization(1, map.localization_id).map(|localization| localization.content).contains(name) {
                return Some(map.clone());
            }
            None
        })
    }
}
