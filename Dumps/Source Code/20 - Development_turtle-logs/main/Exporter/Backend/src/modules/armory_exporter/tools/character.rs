use crate::modules::armory_exporter::domain_value::CharacterTable;
use crate::modules::util::Select;
use crate::modules::ArmoryExporter;
use crate::params;

pub trait RetrieveRecentOfflineCharacters {
    fn get_recent_offline_characters(&mut self, db_characters: &mut impl Select) -> Vec<CharacterTable>;
}

impl RetrieveRecentOfflineCharacters for ArmoryExporter {
    fn get_recent_offline_characters(&mut self, db_characters: &mut impl Select) -> Vec<CharacterTable> {
        let last_fetch_time = self.last_fetch_time;
        db_characters
            .select_wparams(
                "SELECT guid, name, race, class, gender, level, chosenTitle, playerBytes, playerBytes2 FROM characters \
                    WHERE (online=0 AND logout_time > :last_fetch_time) OR (online=1 AND \
                    `map` IN (249,309,409,469,509,531,532,533,534,544,548,550,564,565,568,580,603,615,616,624,631,649,724,559,562,572,617,618,30,489,529,566,607,628))",
                |mut row| CharacterTable {
                    character_id: row.take(0).unwrap(),
                    name: row.take(1).unwrap(),
                    race_id: row.take(2).unwrap(),
                    hero_class_id: row.take(3).unwrap(),
                    gender: row.take(4).unwrap(),
                    level: row.take(5).unwrap(),
                    chosen_title: row.take(6).unwrap(),
                    playerbytes1: row.take(7).unwrap(),
                    playerbytes2: row.take(8).unwrap(),
                },
                params!(
                  "last_fetch_time" => last_fetch_time
                ),
            )
            .to_vec()
    }
}
