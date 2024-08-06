use crate::params;
use crate::util::database::*;

use crate::modules::armory::{
    domain_value::CharacterItem,
    dto::{ArmoryFailure, CharacterItemDto},
    Armory,
};

pub trait GetCharacterItem {
    fn get_character_item(&self, db_main: &mut impl Select, character_item_id: u32) -> Result<CharacterItem, ArmoryFailure>;
    fn get_character_item_by_value(&self, db_main: &mut impl Select, character_item: CharacterItemDto) -> Result<CharacterItem, ArmoryFailure>;
}

impl GetCharacterItem for Armory {
    fn get_character_item(&self, db_main: &mut impl Select, character_item_id: u32) -> Result<CharacterItem, ArmoryFailure> {
        let params = params!(
          "id" => character_item_id
        );
        db_main
            .select_wparams_value(
                "SELECT * FROM armory_item WHERE id=:id",
                |mut row| {
                    Ok(CharacterItem {
                        id: row.take(0).unwrap(),
                        item_id: row.take(1).unwrap(),
                        random_property_id: row.take_opt(2).unwrap().ok(),
                        enchant_id: row.take_opt(3).unwrap().ok(),
                        gem_ids: vec![row.take_opt(4).unwrap().ok(), row.take_opt(5).unwrap().ok(), row.take_opt(6).unwrap().ok(), row.take_opt(7).unwrap().ok()],
                    })
                },
                params,
            )
            .unwrap_or_else(|| Err(ArmoryFailure::Database("get_character_item".to_owned())))
    }

    fn get_character_item_by_value(&self, db_main: &mut impl Select, character_item: CharacterItemDto) -> Result<CharacterItem, ArmoryFailure> {
        let params = params!(
          "item_id" => character_item.item_id,
          "random_property_id" => character_item.random_property_id,
          "enchant_id" => character_item.enchant_id,
          "gem_id1" => character_item.gem_ids.get(0).cloned(),
          "gem_id2" => character_item.gem_ids.get(1).cloned(),
          "gem_id3" => character_item.gem_ids.get(2).cloned(),
          "gem_id4" => character_item.gem_ids.get(3).cloned()
        );
        db_main
            .select_wparams_value(
                "SELECT * FROM armory_item WHERE item_id=:item_id AND ((ISNULL(:random_property_id) AND ISNULL(random_property_id)) OR random_property_id = :random_property_id) AND ((ISNULL(:enchant_id) AND ISNULL(enchant_id)) OR enchant_id = \
                 :enchant_id) AND ((ISNULL(:gem_id1) AND ISNULL(gem_id1)) OR gem_id1 = :gem_id1) AND ((ISNULL(:gem_id2) AND ISNULL(gem_id2)) OR gem_id2 = :gem_id2) AND ((ISNULL(:gem_id3) AND ISNULL(gem_id3)) OR gem_id3 = :gem_id3) AND \
                 ((ISNULL(:gem_id4) AND ISNULL(gem_id4)) OR gem_id4 = :gem_id4)",
                |mut row| {
                    Ok(CharacterItem {
                        id: row.take(0).unwrap(),
                        item_id: row.take(1).unwrap(),
                        random_property_id: row.take_opt(2).unwrap().ok(),
                        enchant_id: row.take_opt(3).unwrap().ok(),
                        gem_ids: vec![row.take_opt(4).unwrap().ok(), row.take_opt(5).unwrap().ok(), row.take_opt(6).unwrap().ok(), row.take_opt(7).unwrap().ok()],
                    })
                },
                params,
            )
            .unwrap_or_else(|| Err(ArmoryFailure::Database("get_character_item_by_value".to_owned())))
    }
}
