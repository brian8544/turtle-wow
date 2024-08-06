use crate::modules::armory_exporter::domain_value::CharacterItemTable;
use crate::modules::util::Select;
use crate::modules::ArmoryExporter;
use crate::params;

pub trait RetrieveCharacterItems {
    fn get_character_items(&self, db_characters: &mut impl Select, character_id: u32) -> Vec<CharacterItemTable>;
}

impl RetrieveCharacterItems for ArmoryExporter {
    fn get_character_items(&self, db_characters: &mut impl Select, character_id: u32) -> Vec<CharacterItemTable> {
        db_characters
            .select_wparams(
                "SELECT a.item, b.itemEntry, a.slot, b.random_prop_id, b.enchant1_id, b.enchant2_id, b.enchant3_id, b.enchant4_id, b.enchant5_id, b.enchant6_id, b.enchant7_id, b.enchant8_id, b.enchant9_id, b.enchant10_id, b.enchant11_id FROM \
                 character_inventory a JOIN item_instance b ON a.item = b.guid WHERE a.guid=:character_id AND bag = 0 AND slot <= 18",
                move |mut row| CharacterItemTable {
                    character_id,
                    item_guid: row.take(0).unwrap(),
                    item_id: row.take(1).unwrap(),
                    slot: row.take(2).unwrap(),
                    random_property_id: row.take(3).unwrap(),
                    enchant_ids: [
                        row.take(4).unwrap(),
                        row.take(5).unwrap(),
                        row.take(6).unwrap(),
                        row.take(7).unwrap(),
                        row.take(8).unwrap(),
                        row.take(9).unwrap(),
                        row.take(10).unwrap(),
                        row.take(11).unwrap(),
                        row.take(12).unwrap(),
                        row.take(13).unwrap(),
                        row.take(14).unwrap(),
                    ],
                },
                params!(
                  "character_id" => character_id
                ),
            )
            .to_vec()
    }
}
