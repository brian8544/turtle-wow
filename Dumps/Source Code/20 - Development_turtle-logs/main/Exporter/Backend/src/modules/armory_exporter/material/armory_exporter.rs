use std::collections::HashMap;
use std::sync::mpsc::Sender;

use crate::modules::armory_exporter::domain_value::MetaTalent;
use crate::modules::util::Select;
use crate::modules::{CharacterDto, InstanceReset};
use crate::params;
use std::env;

#[derive(Debug)]
pub struct ArmoryExporter {
    pub sender_character: Option<Sender<(u32, CharacterDto)>>,
    pub sender_meta_data_instance_reset: Option<Sender<Vec<InstanceReset>>>,
    pub last_instance_reset_fetch_time: u64,
    pub last_fetch_time: u64,
    pub gem_enchant_id_to_item_id: HashMap<u32, u32>,
    pub spell_id_to_meta_talent: HashMap<u32, MetaTalent>,
}

impl Default for ArmoryExporter {
    fn default() -> Self {
        ArmoryExporter {
            sender_character: None,
            sender_meta_data_instance_reset: None,
            last_instance_reset_fetch_time: 0,
            last_fetch_time: 0,
            gem_enchant_id_to_item_id: HashMap::new(),
            spell_id_to_meta_talent: HashMap::new(),
        }
    }
}

impl ArmoryExporter {
    pub fn init(mut self, db_lp_consent: &mut impl Select) -> Self {
        let expansion_id = env::var("EXPANSION_ID").unwrap().parse::<u8>().unwrap();

        self.last_fetch_time = db_lp_consent
            .select_value("SELECT last_fetch FROM meta_data", |mut row| {
                let last_fetch: u64 = row.take(0).unwrap();
                last_fetch
            })
            .unwrap();

        self.last_instance_reset_fetch_time = db_lp_consent
            .select_value("SELECT last_instance_reset_fetch FROM meta_data", |mut row| {
                let last_instance_reset_fetch: u64 = row.take(0).unwrap();
                last_instance_reset_fetch
            })
            .unwrap();

        db_lp_consent
            .select_wparams(
                "SELECT enchant_id, item_id FROM data_gem WHERE expansion_id=:expansion_id",
                |mut row| {
                    let enchant_id: u32 = row.take(0).unwrap();
                    let item_id: u32 = row.take(1).unwrap();
                    (enchant_id, item_id)
                },
                params!("expansion_id" => expansion_id),
            )
            .into_iter()
            .for_each(|(enchant_id, item_id)| {
                self.gem_enchant_id_to_item_id.insert(enchant_id, item_id);
            });

        db_lp_consent
            .select_wparams(
                "SELECT a.tab_order, a.tier, a.column, b.ppt, a.rank0, a.rank1, a.rank2, a.rank3, a.rank4 FROM data_talent a JOIN (SELECT COUNT(id) AS ppt, tab_id, tier  FROM data_talent WHERE expansion_id = :expansion_id GROUP BY tab_id, tier) b \
                 ON a.tab_id = b.tab_id AND a.tier = b.tier WHERE expansion_id=:expansion_id ORDER BY a.rank4",
                |mut row| {
                    let meta_talent = MetaTalent {
                        tab_index: row.take(0).unwrap(),
                        row_index: row.take(1).unwrap(),
                        column_index: row.take(2).unwrap(),
                        num_columns: row.take(3).unwrap(),
                        rank_index: 0,
                    };

                    let mut ranks: Vec<(u32, MetaTalent)> = Vec::new();
                    for i in 4..9 {
                        let rank_id = row.take(i).unwrap();
                        if rank_id == 0 {
                            break;
                        }

                        let mut new_meta_talent = meta_talent.clone();
                        new_meta_talent.rank_index = i as u8 - 4;
                        ranks.push((rank_id, new_meta_talent.to_owned()))
                    }

                    ranks
                },
                params!(
                  "expansion_id" => expansion_id
                ),
            )
            .into_iter()
            .for_each(|ranks| {
                ranks.into_iter().for_each(|(rank_id, meta_talent)| {
                    self.spell_id_to_meta_talent.insert(rank_id, meta_talent);
                })
            });

        self
    }
}
