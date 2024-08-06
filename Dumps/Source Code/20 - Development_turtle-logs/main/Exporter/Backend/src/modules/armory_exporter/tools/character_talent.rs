use crate::modules::util::Select;
use crate::modules::ArmoryExporter;
use crate::params;

pub trait RetrieveCharacterTalents {
    fn get_character_talent(&self, db_characters: &mut impl Select, character_id: u32) -> String;
}

impl RetrieveCharacterTalents for ArmoryExporter {
    fn get_character_talent(&self, db_characters: &mut impl Select, character_id: u32) -> String {
        let mut tabs: [[[i8; 4]; 13]; 3] = [[[0; 4]; 13]; 3];

        db_characters
            .select_wparams(
                "SELECT spell FROM character_spell WHERE guid=:character_id AND slot = 0 AND active = 1",
                |mut row| {
                    let spell_id: u32 = row.take(0).unwrap();
                    spell_id
                },
                params!(
                  "character_id" => character_id
                ),
            )
            .into_iter()
            .for_each(|spell_id| {
                if self.spell_id_to_meta_talent.contains_key(&spell_id) {
                    let meta_talent = self.spell_id_to_meta_talent.get(&spell_id).unwrap();
                    tabs[meta_talent.tab_index as usize][meta_talent.row_index as usize][meta_talent.column_index as usize] = (meta_talent.rank_index + 1) as i8;
                    for i in meta_talent.num_columns..4 {
                        tabs[meta_talent.tab_index as usize][meta_talent.row_index as usize][i as usize] = -1;
                    }
                }
            });

        tabs.iter()
            .map(|tab| {
                tab.iter().fold(String::new(), |acc, row| {
                    acc + &row.iter().fold(String::new(), |acc_i, column| {
                        if *column >= 0 {
                            return acc_i + &column.to_string();
                        }
                        acc_i
                    })
                })
            })
            .collect::<Vec<String>>()
            .join("|")
    }
}
