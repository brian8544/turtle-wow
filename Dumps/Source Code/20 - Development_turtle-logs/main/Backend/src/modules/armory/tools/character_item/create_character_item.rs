use crate::params;
use crate::util::database::*;

use crate::modules::armory::{
    domain_value::CharacterItem,
    dto::{ArmoryFailure, CharacterItemDto},
    tools::GetCharacterItem,
    Armory,
};

pub trait CreateCharacterItem {
    fn create_character_item(&self, db_main: &mut (impl Execute + Select), character_item: CharacterItemDto) -> Result<CharacterItem, ArmoryFailure>;
}

impl CreateCharacterItem for Armory {
    fn create_character_item(&self, db_main: &mut (impl Execute + Select), character_item: CharacterItemDto) -> Result<CharacterItem, ArmoryFailure> {
        // If it already exists, return this one
        let existing_item = self.get_character_item_by_value(db_main, character_item.clone());
        if existing_item.is_ok() {
            return existing_item;
        }

        let params = params!(
          "item_id" => character_item.item_id,
          "random_property_id" => character_item.random_property_id,
          "enchant_id" => character_item.enchant_id,
          "gem_id1" => character_item.gem_ids.get(0).cloned(),
          "gem_id2" => character_item.gem_ids.get(1).cloned(),
          "gem_id3" => character_item.gem_ids.get(2).cloned(),
          "gem_id4" => character_item.gem_ids.get(3).cloned()
        );

        // It may happen that another thread is inserting the same item
        // Therefore the insert will fail due to the unique constraint
        // So in any case, attempt to retrieve the character item
        db_main.execute_wparams(
            "INSERT INTO armory_item (`item_id`, `random_property_id`, `enchant_id`, `gem_id1`, `gem_id2`, `gem_id3`, `gem_id4`) VALUES (:item_id, :random_property_id, :enchant_id, :gem_id1, :gem_id2, :gem_id3, :gem_id4)",
            params,
        );
        if let Ok(char_item) = self.get_character_item_by_value(db_main, character_item.clone()) {
            return Ok(char_item);
        }
        Err(ArmoryFailure::Database(format!("create_character_item: {:?}", character_item)))
    }
}
