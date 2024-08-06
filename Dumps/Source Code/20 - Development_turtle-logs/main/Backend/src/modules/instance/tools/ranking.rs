use std::collections::HashMap;

use crate::modules::armory::Armory;
use crate::modules::armory::tools::GetCharacter;
use crate::modules::instance::domain_value::{InstanceMeta, PrivacyType};
use crate::modules::instance::dto::{RankingCharacterMeta, RankingResult};

pub fn create_ranking_export(instance_metas: &HashMap<u32, InstanceMeta>, rankings: &HashMap<u32, HashMap<u32, Vec<RankingResult>>>, armory: &Armory, season: Option<u8>, server_id: Option<u32>) -> Vec<(u32, Vec<(u32, RankingCharacterMeta, Vec<RankingResult>)>)> {
    rankings
        .iter()
        .filter_map(|(npc_id, char_rankings)| {
            let res_char_rankings: Vec<(u32, RankingCharacterMeta, Vec<RankingResult>)> = char_rankings
                .iter()
                .filter_map(|(character_id, rankings)| {
                    let character = armory
                        .get_character(*character_id)
                        .map(|character| RankingCharacterMeta {
                            server_id: character.server_id,
                            hero_class_id: character.last_update.as_ref().map(|last_update| last_update.character_info.hero_class_id).unwrap_or_else(|| 0),
                            name: character.last_update.as_ref().map(|last_update| last_update.character_name.clone()).unwrap_or_else(|| String::from("Unknown")),
                        })
                        .unwrap();

                    if server_id.is_some() && !server_id.contains(&character.server_id) {
                        return None;
                    }

                    let res_rankings: Vec<RankingResult> = rankings.iter().filter_map(|rr| {
                        let instance_meta = instance_metas.get(&rr.instance_meta_id)?;
                        if instance_meta.privacy_type == PrivacyType::Public && (season.is_none() || season.contains(&rr.season_index)) {
                            return Some(rr);
                        }
                        None
                    }).cloned().collect();
                    if res_rankings.len() == 0 {
                        return None;
                    }

                    Some((
                        *character_id,
                         character,
                        res_rankings
                    ))
                })
                .collect();
            if res_char_rankings.len() == 0 {
                return None;
            }

            Some((
                *npc_id,
                res_char_rankings
            ))
        })
        .collect()
}

fn helper_get_best_ranking(ranking: Vec<RankingResult>) -> RankingResult {
    ranking.iter().fold(
        RankingResult {
            instance_meta_id: 0,
            attempt_id: 0,
            amount: 0,
            duration: 1,
            difficulty_id: 0,
            character_spec: 0,
            season_index: 0,
        },
        |best, ranking_result| {
            if (best.amount as f64 / best.duration as f64) < (ranking_result.amount as f64 / ranking_result.duration as f64) {
                return ranking_result.clone();
            }
            best
        },
    )
}
