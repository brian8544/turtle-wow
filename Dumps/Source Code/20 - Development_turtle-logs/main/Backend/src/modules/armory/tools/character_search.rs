use std::cmp::Ordering;

use crate::modules::armory::material::{Character, Guild};
use crate::util::ordering::NegateOrdExt;
use crate::{
    dto::SearchResult,
    modules::{
        armory::{
            dto::{CharacterSearchCharacterDto, CharacterSearchFilter, CharacterSearchResult, SearchGuildDto},
            tools::GetGuild,
            Armory,
        },
        data::{tools::RetrieveRace, Data},
    },
    rpll_table_sort,
};

pub trait PerformCharacterSearch {
    fn get_character_search_result(&self, data: &Data, filter: CharacterSearchFilter) -> SearchResult<CharacterSearchResult>;
}

impl PerformCharacterSearch for Armory {
    // This implementation is far away from being optimal.
    fn get_character_search_result(&self, data: &Data, mut filter: CharacterSearchFilter) -> SearchResult<CharacterSearchResult> {
        filter.name.convert_to_lowercase();
        filter.guild.convert_to_lowercase();
        let characters = self.characters.read().unwrap();
        let result = characters.iter().filter(|(_, character)| character.last_update.is_some());
        let mut result: Vec<(&Character, Option<Guild>)> = result
            .filter(|(_, character)| filter.server.filter.is_none() || filter.server.filter.contains(&character.server_id))
            .filter(|(_, character)| filter.name.filter.is_none() || character.last_update.as_ref().unwrap().character_name.to_lowercase().contains(filter.name.filter.as_ref().unwrap()))
            .filter(|(_, character)| filter.hero_class.filter.is_none() || filter.hero_class.filter.contains(&character.last_update.as_ref().unwrap().character_info.hero_class_id))
            .filter(|(_, character)| {
                if filter.last_updated.filter.is_none() {
                    return true;
                }
                let filter_timestamp = *filter.last_updated.filter.as_ref().unwrap();
                let current_timestamp = character.last_update.as_ref().unwrap().timestamp;
                current_timestamp >= filter_timestamp && current_timestamp <= filter_timestamp + 24 * 60 * 60
            })
            .filter_map(|(_, character)| {
                if let Some(character_guild) = character.last_update.as_ref().unwrap().character_guild.as_ref() {
                    if let Some(guild) = self.get_guild(character_guild.guild_id) {
                        if filter.guild.filter.is_none() || guild.name.to_lowercase().contains(filter.guild.filter.as_ref().unwrap()) {
                            return Some((character, Some(guild)));
                        }
                    }
                }
                if filter.guild.filter.is_none() {
                    return Some((character, None));
                }
                None
            })
            .collect();
        let num_characters = result.len();

        result.sort_by(|(l_char, l_guild), (r_char, r_guild)| {
            rpll_table_sort! {
                (filter.hero_class, Some(&l_char.last_update.as_ref().unwrap().character_info.hero_class_id), Some(&r_char.last_update.as_ref().unwrap().character_info.hero_class_id)),
                (filter.name, Some(&l_char.last_update.as_ref().unwrap().character_name), Some(&r_char.last_update.as_ref().unwrap().character_name)),
                (filter.guild, l_guild.as_ref().map(|gld| &gld.name), r_guild.as_ref().map(|gld| &gld.name)),
                (filter.server, Some(&l_char.server_id), Some(&r_char.server_id)),
                (filter.last_updated, Some(&l_char.last_update.as_ref().unwrap().timestamp), Some(&r_char.last_update.as_ref().unwrap().timestamp))
            }
        });

        SearchResult {
            result: result
                .iter()
                .skip((filter.page * 10) as usize)
                .take(10)
                .map(|(character, guild)| {
                    let race_id = character.last_update.as_ref().unwrap().character_info.race_id;
                    let last_update = character.last_update.as_ref().unwrap();
                    CharacterSearchResult {
                        faction: data.get_race(race_id).unwrap().faction,
                        guild: guild.as_ref().map(|innr_gld| SearchGuildDto {
                            guild_id: innr_gld.id,
                            name: innr_gld.name.clone(),
                        }),
                        character: CharacterSearchCharacterDto {
                            character_id: character.id,
                            name: last_update.character_name.clone(),
                            hero_class_id: last_update.character_info.hero_class_id,
                            server_id: character.server_id,
                        },
                        timestamp: last_update.timestamp,
                    }
                })
                .collect::<Vec<CharacterSearchResult>>(),
            num_items: num_characters,
        }
    }
}
