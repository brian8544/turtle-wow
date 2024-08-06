use crate::dto::{ApplyFilter, ApplyFilterTs, SearchResult};
use crate::modules::armory::dto::SearchGuildDto;
use crate::modules::armory::Armory;
use crate::modules::data::tools::RetrieveMap;
use crate::modules::data::Data;
use crate::modules::instance::domain_value::{InstanceMeta, MetaType, PrivacyType};
use crate::modules::instance::dto::{BattlegroundSearchFilter, MetaBattlegroundSearch, MetaRaidSearch, MetaRatedArenaSearch, MetaSkirmishSearch, RaidSearchFilter, RatedArenaSearchFilter, SearchArenaTeam, SkirmishSearchFilter};
use crate::modules::instance::tools::{ExportMeta, FindInstanceGuild};
use crate::modules::instance::Instance;
use crate::rpll_table_sort;
use crate::util::database::Select;
use crate::util::ordering::NegateOrdExt;
use std::cmp::Ordering;

pub trait MetaSearch {
    fn search_meta_raids(&self, db_main: &mut impl Select, armory: &Armory, data: &Data, current_user: Option<u32>, filter: RaidSearchFilter) -> SearchResult<MetaRaidSearch>;
    fn search_meta_raids_by_member(&self, db_main: &mut impl Select, armory: &Armory, data: &Data, current_user: Option<u32>, filter: RaidSearchFilter) -> SearchResult<MetaRaidSearch>;
    fn search_meta_raids_by_character(&self, db_main: &mut impl Select, armory: &Armory, data: &Data, character_id: u32, filter: RaidSearchFilter) -> SearchResult<MetaRaidSearch>;
    fn search_meta_rated_arenas(&self, current_user: Option<u32>, filter: RatedArenaSearchFilter) -> SearchResult<MetaRatedArenaSearch>;
    fn search_meta_skirmishes(&self, current_user: Option<u32>, filter: SkirmishSearchFilter) -> SearchResult<MetaSkirmishSearch>;
    fn search_meta_battlegrounds(&self, current_user: Option<u32>, filter: BattlegroundSearchFilter) -> SearchResult<MetaBattlegroundSearch>;
}

impl MetaSearch for Instance {
    fn search_meta_raids(&self, db_main: &mut impl Select, armory: &Armory, data: &Data, current_user: Option<u32>, mut filter: RaidSearchFilter) -> SearchResult<MetaRaidSearch> {
        filter.guild.convert_to_lowercase();
        let mut result = self
            .export_meta(0)
            .into_iter()
            .filter(|raid| raid.privacy_type == PrivacyType::Public)
            .filter(|raid| filter.map_id.apply_filter(raid.map_id))
            .filter(|raid| filter.server_id.apply_filter(raid.server_id))
            .filter(|raid| filter.start_ts.apply_filter_ts(raid.start_ts))
            .filter(|raid| filter.end_ts.apply_filter_ts(raid.end_ts))
            .filter_map(|raid| {
                if let InstanceMeta {
                    instance_specific: MetaType::Raid { map_difficulty },
                    ..
                } = raid
                {
                    if filter.map_difficulty.apply_filter(map_difficulty) {
                        let guild = raid.participants.find_instance_guild(db_main, armory, raid.start_ts)
                            .map(|guild| SearchGuildDto { guild_id: guild.id, name: guild.name });
                        if filter.guild.apply_filter(guild.as_ref().map(|guild| guild.name.clone())) {
                            return Some(MetaRaidSearch {
                                instance_meta_id: raid.instance_meta_id,
                                map_id: raid.map_id,
                                map_difficulty,
                                map_icon: data.get_map(raid.map_id).map(|map| map.icon).unwrap(),
                                guild,
                                server_id: raid.server_id,
                                start_ts: raid.start_ts,
                                end_ts: raid.end_ts,
                                can_delete: current_user.contains(&raid.uploaded_user),
                                privacy_type: raid.privacy_type.to_u8(),
                                privacy_ref: raid.privacy_type.get_group()
                            });
                        }
                    }
                }
                None
            })
            .collect::<Vec<MetaRaidSearch>>();
        let num_raids = result.len();

        result.sort_by(|l_instance, r_instance| {
            rpll_table_sort! {
                (filter.map_id, Some(l_instance.map_id), Some(r_instance.map_id)),
                (filter.map_difficulty, Some(l_instance.map_difficulty), Some(r_instance.map_difficulty)),
                (filter.guild, l_instance.guild.as_ref().map(|guild| guild.name.clone()), r_instance.guild.as_ref().map(|guild| guild.name.clone())),
                (filter.server_id, Some(l_instance.server_id), Some(r_instance.server_id)),
                (filter.start_ts, Some(l_instance.start_ts), Some(r_instance.start_ts)),
                (filter.end_ts, l_instance.end_ts, r_instance.end_ts)
            }
        });

        SearchResult {
            result: result.into_iter().skip((filter.page * 10) as usize).take(10).collect(),
            num_items: num_raids,
        }
    }

    fn search_meta_raids_by_member(&self, db_main: &mut impl Select, armory: &Armory, data: &Data, current_user: Option<u32>, mut filter: RaidSearchFilter) -> SearchResult<MetaRaidSearch> {
        filter.guild.convert_to_lowercase();
        let mut result = self
            .export_meta(0)
            .into_iter()
            .filter(|raid| filter.map_id.apply_filter(raid.map_id))
            .filter(|raid| filter.start_ts.apply_filter_ts(raid.start_ts))
            .filter(|raid| filter.end_ts.apply_filter_ts(raid.end_ts))
            .filter(|raid| current_user.contains(&raid.uploaded_user))
            .filter(|raid| filter.privacy.apply_filter(raid.privacy_type.to_u8()))
            .filter_map(|raid| {
                if let InstanceMeta {
                    instance_specific: MetaType::Raid { map_difficulty },
                    ..
                } = raid
                {
                    let guild = raid.participants.find_instance_guild(db_main, armory, raid.start_ts).map(|guild| SearchGuildDto { guild_id: guild.id, name: guild.name });
                    return Some(MetaRaidSearch {
                        instance_meta_id: raid.instance_meta_id,
                        map_id: raid.map_id,
                        map_difficulty,
                        map_icon: data.get_map(raid.map_id).map(|map| map.icon).unwrap(),
                        guild,
                        server_id: raid.server_id,
                        start_ts: raid.start_ts,
                        end_ts: raid.end_ts,
                        can_delete: true,
                        privacy_type: raid.privacy_type.to_u8(),
                        privacy_ref: raid.privacy_type.get_group()
                    });
                }
                None
            })
            .collect::<Vec<MetaRaidSearch>>();
        let num_raids = result.len();

        result.sort_by(|l_instance, r_instance| {
            rpll_table_sort! {
                (filter.map_id, Some(l_instance.map_id), Some(r_instance.map_id)),
                (filter.start_ts, Some(l_instance.start_ts), Some(r_instance.start_ts)),
                (filter.end_ts, l_instance.end_ts, r_instance.end_ts),
                (filter.privacy, Some(l_instance.privacy_type), Some(r_instance.privacy_type))
            }
        });

        SearchResult {
            result: result.into_iter().skip((filter.page * 10) as usize).take(10).collect(),
            num_items: num_raids,
        }
    }

    fn search_meta_raids_by_character(&self, db_main: &mut impl Select, armory: &Armory, data: &Data, character_id: u32, mut filter: RaidSearchFilter) -> SearchResult<MetaRaidSearch> {
        filter.guild.convert_to_lowercase();
        let mut result = self
            .export_meta(0)
            .into_iter()
            .filter(|raid| raid.privacy_type == PrivacyType::Public)
            .filter(|raid| filter.map_id.apply_filter(raid.map_id))
            .filter(|raid| filter.start_ts.apply_filter_ts(raid.start_ts))
            .filter(|raid| filter.end_ts.apply_filter_ts(raid.end_ts))
            .filter(|raid| raid.participants.iter().any(|participant| *participant == character_id))
            .filter_map(|raid| {
                if let InstanceMeta {
                    instance_specific: MetaType::Raid { map_difficulty },
                    ..
                } = raid
                {
                    if filter.map_difficulty.apply_filter(map_difficulty) {
                        let guild = raid.participants.find_instance_guild(db_main, armory, raid.start_ts).map(|guild| SearchGuildDto { guild_id: guild.id, name: guild.name });
                        return Some(MetaRaidSearch {
                            instance_meta_id: raid.instance_meta_id,
                            map_id: raid.map_id,
                            map_difficulty,
                            map_icon: data.get_map(raid.map_id).map(|map| map.icon).unwrap(),
                            guild,
                            server_id: raid.server_id,
                            start_ts: raid.start_ts,
                            end_ts: raid.end_ts,
                            can_delete: false,
                            privacy_type: raid.privacy_type.to_u8(),
                            privacy_ref: raid.privacy_type.get_group()
                        });
                    }
                }
                None
            })
            .collect::<Vec<MetaRaidSearch>>();
        let num_raids = result.len();

        result.sort_by(|l_instance, r_instance| {
            rpll_table_sort! {
                (filter.map_id, Some(l_instance.map_id), Some(r_instance.map_id)),
                (filter.map_difficulty, Some(l_instance.map_difficulty), Some(r_instance.map_difficulty)),
                (filter.start_ts, Some(l_instance.start_ts), Some(r_instance.start_ts)),
                (filter.end_ts, l_instance.end_ts, r_instance.end_ts)
            }
        });

        SearchResult {
            result: result.into_iter().skip((filter.page * 10) as usize).take(10).collect(),
            num_items: num_raids,
        }
    }

    fn search_meta_rated_arenas(&self, current_user: Option<u32>, mut filter: RatedArenaSearchFilter) -> SearchResult<MetaRatedArenaSearch> {
        filter.team1.convert_to_lowercase();
        filter.team2.convert_to_lowercase();
        let mut result = self
            .export_meta(1)
            .into_iter()
            .filter(|rated_arena| filter.map_id.apply_filter(rated_arena.map_id))
            .filter(|rated_arena| filter.server_id.apply_filter(rated_arena.server_id))
            .filter(|rated_arena| filter.start_ts.apply_filter_ts(rated_arena.start_ts))
            .filter(|rated_arena| filter.end_ts.apply_filter_ts(rated_arena.end_ts))
            .filter_map(|rated_arena| {
                if let InstanceMeta {
                    instance_specific:
                        MetaType::RatedArena {
                            winner,
                            team1,
                            team2,
                            team1_change,
                            team2_change,
                        },
                    ..
                } = rated_arena
                {
                    if filter.team1_change.apply_filter(team1_change) && filter.team2_change.apply_filter(team2_change) && filter.team1.apply_filter(Some(team1.team_name.clone())) && filter.team2.apply_filter(Some(team2.team_name.clone())) {
                        return Some(MetaRatedArenaSearch {
                            map_id: rated_arena.map_id,
                            team1: SearchArenaTeam { team_id: team1.id, name: team1.team_name },
                            team2: SearchArenaTeam { team_id: team2.id, name: team2.team_name },
                            winner,
                            server_id: rated_arena.server_id,
                            team1_change,
                            team2_change,
                            start_ts: rated_arena.start_ts,
                            end_ts: rated_arena.end_ts,
                            can_delete: current_user.contains(&rated_arena.uploaded_user),
                        });
                    }
                }
                None
            })
            .collect::<Vec<MetaRatedArenaSearch>>();
        let num_rated_arenas = result.len();

        result.sort_by(|l_instance, r_instance| {
            rpll_table_sort! {
                (filter.map_id, Some(l_instance.map_id), Some(r_instance.map_id)),
                (filter.team1, Some(l_instance.team1.name.clone()), Some(r_instance.team1.name.clone())),
                (filter.team2, Some(l_instance.team2.name.clone()), Some(r_instance.team2.name.clone())),
                (filter.server_id, Some(l_instance.server_id), Some(r_instance.server_id)),
                (filter.team1_change, Some(l_instance.team1_change), Some(r_instance.team1_change)),
                (filter.team2_change, Some(l_instance.team2_change), Some(r_instance.team2_change)),
                (filter.start_ts, Some(l_instance.start_ts), Some(r_instance.start_ts)),
                (filter.end_ts, l_instance.end_ts, r_instance.end_ts)
            }
        });

        SearchResult {
            result: result.into_iter().skip((filter.page * 10) as usize).take(10).collect(),
            num_items: num_rated_arenas,
        }
    }

    fn search_meta_skirmishes(&self, current_user: Option<u32>, filter: SkirmishSearchFilter) -> SearchResult<MetaSkirmishSearch> {
        let mut result = self
            .export_meta(2)
            .into_iter()
            .filter(|skirmish| filter.map_id.apply_filter(skirmish.map_id))
            .filter(|skirmish| filter.server_id.apply_filter(skirmish.server_id))
            .filter(|skirmish| filter.start_ts.apply_filter_ts(skirmish.start_ts))
            .filter(|skirmish| filter.end_ts.apply_filter_ts(skirmish.end_ts))
            .filter_map(|skirmish| {
                if let InstanceMeta {
                    instance_specific: MetaType::Skirmish { winner },
                    ..
                } = skirmish
                {
                    return Some(MetaSkirmishSearch {
                        map_id: skirmish.map_id,
                        server_id: skirmish.server_id,
                        winner,
                        start_ts: skirmish.start_ts,
                        end_ts: skirmish.end_ts,
                        can_delete: current_user.contains(&skirmish.uploaded_user),
                    });
                }
                None
            })
            .collect::<Vec<MetaSkirmishSearch>>();
        let num_skirmishes = result.len();

        result.sort_by(|l_instance, r_instance| {
            rpll_table_sort! {
                (filter.map_id, Some(l_instance.map_id), Some(r_instance.map_id)),
                (filter.server_id, Some(l_instance.server_id), Some(r_instance.server_id)),
                (filter.start_ts, Some(l_instance.start_ts), Some(r_instance.start_ts)),
                (filter.end_ts, l_instance.end_ts, r_instance.end_ts)
            }
        });

        SearchResult {
            result: result.into_iter().skip((filter.page * 10) as usize).take(10).collect(),
            num_items: num_skirmishes,
        }
    }

    fn search_meta_battlegrounds(&self, current_user: Option<u32>, filter: BattlegroundSearchFilter) -> SearchResult<MetaBattlegroundSearch> {
        let mut result = self
            .export_meta(3)
            .into_iter()
            .filter(|skirmish| filter.map_id.apply_filter(skirmish.map_id))
            .filter(|skirmish| filter.server_id.apply_filter(skirmish.server_id))
            .filter(|skirmish| filter.start_ts.apply_filter_ts(skirmish.start_ts))
            .filter(|skirmish| filter.end_ts.apply_filter_ts(skirmish.end_ts))
            .filter_map(|skirmish| {
                if let InstanceMeta {
                    instance_specific: MetaType::Battleground { winner, score_alliance, score_horde },
                    ..
                } = skirmish
                {
                    if filter.score_alliance.apply_filter(score_alliance) && filter.score_horde.apply_filter(score_horde) {
                        return Some(MetaBattlegroundSearch {
                            map_id: skirmish.map_id,
                            server_id: skirmish.server_id,
                            winner,
                            score_alliance,
                            score_horde,
                            start_ts: skirmish.start_ts,
                            end_ts: skirmish.end_ts,
                            can_delete: current_user.contains(&skirmish.uploaded_user),
                        });
                    }
                }
                None
            })
            .collect::<Vec<MetaBattlegroundSearch>>();
        let num_battlegrounds = result.len();

        result.sort_by(|l_instance, r_instance| {
            rpll_table_sort! {
                (filter.map_id, Some(l_instance.map_id), Some(r_instance.map_id)),
                (filter.server_id, Some(l_instance.server_id), Some(r_instance.server_id)),
                (filter.score_alliance, Some(l_instance.score_alliance), Some(r_instance.score_alliance)),
                (filter.score_horde, Some(l_instance.score_horde), Some(r_instance.score_horde)),
                (filter.start_ts, Some(l_instance.start_ts), Some(r_instance.start_ts)),
                (filter.end_ts, l_instance.end_ts, r_instance.end_ts)
            }
        });

        SearchResult {
            result: result.into_iter().skip((filter.page * 10) as usize).take(10).collect(),
            num_items: num_battlegrounds,
        }
    }
}
