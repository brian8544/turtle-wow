use language::{domain_value::Language, material::Dictionary, tools::Get};
use regex::Regex;

use crate::modules::data::{
    tools::{RetrieveLocalization, RetrieveSpell, RetrieveSpellEffect},
    Data, Stat,
};
use std::cmp::Ordering;

pub trait SpellDescription {
    fn get_localized_spell_description(&self, expansion_id: u8, language_id: u8, spell_id: u32) -> Option<String>;
    fn parse_stats(&self, expansion_id: u8, spell_id: u32) -> Vec<Stat>;
}

impl SpellDescription for Data {
    fn get_localized_spell_description(&self, expansion_id: u8, language_id: u8, spell_id: u32) -> Option<String> {
        lazy_static! {
            static ref RE: Regex = Regex::new(r"\$(\d+)(s\d|x\d|a\d|o\d|m\d|M\d|d|o)").unwrap();
        }

        let spell = self.get_spell(expansion_id, spell_id)?;
        let mut template = self.get_localization(language_id, spell.description_localization_id).map(|localization| localization.content).unwrap();

        let spell_effects = self.get_spell_effects(expansion_id, spell_id)?;
        template = template.replace("$d1", &format_duration(&self.dictionary, language_id, spell.duration.abs() as u32));
        template = template.replace("$d", &format_duration(&self.dictionary, language_id, spell.duration.abs() as u32));

        let spell_effects_len = spell_effects.len();
        for (i, se_item) in spell_effects.iter().enumerate() {
            if i + 1 == spell_effects_len {
                template = template.replace(&format!("$s{}", i + 2), &se_item.points_upper.abs().to_string());
            }

            template = template.replace(&format!("$s{}", i + 1), &se_item.points_upper.abs().to_string());
            template = template.replace(&format!("${{$m{}/-1000}}.1", i + 1), &format!("{:.1}", (se_item.points_upper as f64 / 1000.0).abs()));
            template = template.replace(&format!("${{$m{}/-1000}}.2", i + 1), &format!("{:.2}", (se_item.points_upper as f64 / 1000.0).abs()));
            template = template.replace(&format!("${{$m{}/1000}}", i + 1), &format!("{:.1}", (se_item.points_upper as f64 / 1000.0).abs()));
            template = template.replace(&format!("${{$m{}/-1000}}", i + 1), &format!("{:.1}", (se_item.points_upper as f64 / 1000.0).abs()));
            template = template.replace(&format!("${{$m{}/-10}}", i + 1), &format!("{:.1}", (se_item.points_upper as f64 / 10.0).abs()));
            template = template.replace(&format!("$/1000;s{}", i + 1), &format!("{:.1}", (se_item.points_upper as f64 / 1000.0).abs()));
            template = template.replace(&format!("$/1000;S{}", i + 1), &format!("{:.1}", (se_item.points_upper as f64 / 1000.0).abs()));
            template = template.replace(&format!("$/10;s{}", i + 1), &format!("{:.1}", (se_item.points_upper as f64 / 10.0).abs()));
            template = template.replace(&format!("$M{}", i + 1), &se_item.points_upper.to_string());
            template = template.replace(&format!("$m{}", i + 1), &se_item.points_upper.to_string());
            template = template.replace(&format!("$o{}", i + 1), &se_item.points_upper.to_string());
            template = template.replace(&format!("$x{}", i + 1), &se_item.chain_targets.to_string());
            template = template.replace(&format!("$a{}", i + 1), &se_item.radius.to_string());
            template = template.replace("${50/10}", "5");

            template = template.replace("$o", &se_item.points_upper.to_string()); // ?!
            if RE.is_match(&template) {
                let mut temp_res = template.clone();
                for capture in RE.captures_iter(&template) {
                    if capture.len() < 2 {
                        continue;
                    }

                    let inner_spell_id_res = capture[1].parse::<u32>();
                    if inner_spell_id_res.is_err() {
                        continue;
                    }
                    let inner_spell_id = inner_spell_id_res.unwrap();

                    let inner_spell_res = self.get_spell(expansion_id, inner_spell_id);
                    if inner_spell_res.is_none() {
                        continue;
                    }
                    let inner_spell = inner_spell_res.unwrap();
                    temp_res = temp_res.replace(&format!("${}d1", capture[1].to_string()), &format_duration(&self.dictionary, language_id, inner_spell.duration.abs() as u32));
                    temp_res = temp_res.replace(&format!("${}d", capture[1].to_string()), &format_duration(&self.dictionary, language_id, inner_spell.duration.abs() as u32));
                    let inner_spell_effects = self.get_spell_effects(expansion_id, inner_spell_id)?;
                    for (i, ise_item) in inner_spell_effects.iter().enumerate() {
                        temp_res = temp_res.replace(&format!("${}s{}", capture[1].to_string(), i + 1), &ise_item.points_upper.abs().to_string());
                        temp_res = temp_res.replace(&format!("${{${}m{}/-1000}}.1", capture[1].to_string(), i + 1), &format!("{:.1}", (ise_item.points_upper as f64 / 1000.0).abs()));
                        temp_res = temp_res.replace(&format!("${{${}m{}/-1000}}.2", capture[1].to_string(), i + 1), &format!("{:.2}", (ise_item.points_upper as f64 / 1000.0).abs()));
                        temp_res = temp_res.replace(&format!("${{${}m{}*15/100}}", capture[1].to_string(), i + 1), &format!("{:.1}", (ise_item.points_upper as f64 * 0.15).abs()));
                        temp_res = temp_res.replace(&format!("${{${}m{}*45/100}}", capture[1].to_string(), i + 1), &format!("{:.1}", (ise_item.points_upper as f64 * 0.45).abs()));
                        temp_res = temp_res.replace(&format!("${}{{$m{}/1000}}", capture[1].to_string(), i + 1), &format!("{:.1}", (ise_item.points_upper as f64 / 1000.0).abs()));
                        temp_res = temp_res.replace(&format!("${}{{$m{}/-1000}}", capture[1].to_string(), i + 1), &format!("{:.1}", (ise_item.points_upper as f64 / 1000.0).abs()));
                        temp_res = temp_res.replace(&format!("${}{{$m{}/-10}}", capture[1].to_string(), i + 1), &format!("{:.1}", (ise_item.points_upper as f64 / 10.0).abs()));
                        temp_res = temp_res.replace(&format!("${}{{$m{}*15/100}}", capture[1].to_string(), i + 1), &format!("{:.1}", (ise_item.points_upper as f64 * 0.15).abs()));
                        temp_res = temp_res.replace(&format!("${}{{$m{}*45/100}}", capture[1].to_string(), i + 1), &format!("{:.1}", (ise_item.points_upper as f64 * 0.45).abs()));
                        temp_res = temp_res.replace(&format!("${}/1000;s{}", capture[1].to_string(), i + 1), &format!("{:.1}", (ise_item.points_upper as f64 / 1000.0).abs()));
                        temp_res = temp_res.replace(&format!("${}/1000;S{}", capture[1].to_string(), i + 1), &format!("{:.1}", (ise_item.points_upper as f64 / 1000.0).abs()));
                        temp_res = temp_res.replace(&format!("${}/10;s{}", capture[1].to_string(), i + 1), &format!("{:.1}", (ise_item.points_upper as f64 / 10.0).abs()));
                        temp_res = temp_res.replace(&format!("${}o{}", capture[1].to_string(), i + 1), &ise_item.points_upper.abs().to_string());
                        temp_res = temp_res.replace(&format!("${}x{}", capture[1].to_string(), i + 1), &ise_item.chain_targets.to_string());
                        temp_res = temp_res.replace(&format!("${}a{}", capture[1].to_string(), i + 1), &ise_item.radius.to_string());
                        temp_res = temp_res.replace(&format!("${}o", capture[1].to_string()), &ise_item.points_upper.abs().to_string()); // ?!
                    }

                    if inner_spell_effects.len() == 1 {
                        for i in 0..10 {
                            temp_res = temp_res.replace(&format!("${}s{}", capture[1].to_string(), i + 1), &inner_spell_effects[0].points_upper.abs().to_string());
                            temp_res = temp_res.replace(&format!("${{${}m{}/-1000}}.1", capture[1].to_string(), i + 1), &format!("{:.1}", (inner_spell_effects[0].points_upper as f64 / 1000.0).abs()));
                            temp_res = temp_res.replace(&format!("${{${}m{}/-1000}}.2", capture[1].to_string(), i + 1), &format!("{:.2}", (inner_spell_effects[0].points_upper as f64 / 1000.0).abs()));
                            temp_res = temp_res.replace(&format!("${{${}m{}*15/100}}", capture[1].to_string(), i + 1), &format!("{:.1}", (inner_spell_effects[0].points_upper as f64 * 0.15).abs()));
                            temp_res = temp_res.replace(&format!("${{${}m{}*45/100}}", capture[1].to_string(), i + 1), &format!("{:.1}", (inner_spell_effects[0].points_upper as f64 * 0.45).abs()));
                            temp_res = temp_res.replace(&format!("${}{{$m{}/1000}}", capture[1].to_string(), i + 1), &format!("{:.1}", (inner_spell_effects[0].points_upper as f64 / 1000.0).abs()));
                            temp_res = temp_res.replace(&format!("${}{{$m{}/-1000}}", capture[1].to_string(), i + 1), &format!("{:.1}", (inner_spell_effects[0].points_upper as f64 / 1000.0).abs()));
                            temp_res = temp_res.replace(&format!("${}{{$m{}/-10}}", capture[1].to_string(), i + 1), &format!("{:.1}", (inner_spell_effects[0].points_upper as f64 / 10.0).abs()));
                            temp_res = temp_res.replace(&format!("${}{{$m{}*15/100}}", capture[1].to_string(), i + 1), &format!("{:.1}", (inner_spell_effects[0].points_upper as f64 * 0.15).abs()));
                            temp_res = temp_res.replace(&format!("${}{{$m{}*45/100}}", capture[1].to_string(), i + 1), &format!("{:.1}", (inner_spell_effects[0].points_upper as f64 * 0.45).abs()));
                            temp_res = temp_res.replace(&format!("${}/1000;s{}", capture[1].to_string(), i + 1), &format!("{:.1}", (inner_spell_effects[0].points_upper as f64 / 1000.0).abs()));
                            temp_res = temp_res.replace(&format!("${}/1000;S{}", capture[1].to_string(), i + 1), &format!("{:.1}", (inner_spell_effects[0].points_upper as f64 / 1000.0).abs()));
                            temp_res = temp_res.replace(&format!("${}/10;s{}", capture[1].to_string(), i + 1), &format!("{:.1}", (inner_spell_effects[0].points_upper as f64 / 10.0).abs()));
                        }
                    }
                }
                template = temp_res.to_owned();
            }
        }

        Some(template)
    }

    fn parse_stats(&self, expansion_id: u8, spell_id: u32) -> Vec<Stat> {
        lazy_static! {
            static ref RE_DURATIONAL: Regex = Regex::new(r"for \d+ seconds.").unwrap();
        }

        let mut stats = Vec::new();
        if let Some(spell_desc) = self.get_localized_spell_description(expansion_id, 1, spell_id) {
            let spell_desc = spell_desc.to_lowercase();
            if RE_DURATIONAL.is_match(&spell_desc) {
                return stats;
            }

            let spell_effects = self.get_spell_effects(expansion_id, spell_id).unwrap();
            if spell_desc.contains("increases") || spell_desc.contains("improves") {
                if spell_desc.contains("spell critical strike rating") {
                    stats.push(Stat {
                        stat_type: 24,
                        stat_value: spell_effects[0].points_upper.abs() as u16,
                    });
                } else if spell_desc.contains("critical strike rating") {
                    stats.push(Stat {
                        stat_type: 8,
                        stat_value: spell_effects[0].points_upper.abs() as u16,
                    });
                } else if spell_desc.contains("spell hit rating") {
                    stats.push(Stat {
                        stat_type: 23,
                        stat_value: spell_effects[0].points_upper.abs() as u16,
                    });
                } else if spell_desc.contains("hit rating") {
                    stats.push(Stat {
                        stat_type: 7,
                        stat_value: spell_effects[0].points_upper.abs() as u16,
                    });
                } else if spell_desc.contains("resilience rating") {
                    stats.push(Stat {
                        stat_type: 39,
                        stat_value: spell_effects[0].points_upper.abs() as u16,
                    });
                } else if spell_desc.contains("damage and healing done by") {
                    stats.push(Stat {
                        stat_type: 13,
                        stat_value: spell_effects[0].points_upper.abs() as u16,
                    });
                    stats.push(Stat {
                        stat_type: 14,
                        stat_value: spell_effects[0].points_upper.abs() as u16,
                    });
                } else if spell_desc.contains("healing done by up to") && spell_desc.contains("damage done by up to") {
                    stats.push(Stat {
                        stat_type: 14,
                        stat_value: spell_effects[0].points_upper.abs() as u16,
                    });
                    stats.push(Stat {
                        stat_type: 13,
                        stat_value: spell_effects[1].points_upper.abs() as u16,
                    });
                } else if spell_desc.contains("spell haste rating") {
                    stats.push(Stat {
                        stat_type: 42,
                        stat_value: spell_effects[0].points_upper.abs() as u16,
                    });
                } else if spell_desc.contains("haste rating") {
                    stats.push(Stat {
                        stat_type: 37,
                        stat_value: spell_effects[0].points_upper.abs() as u16,
                    });
                } else if spell_desc.contains("ranged attack power") {
                    stats.push(Stat {
                        stat_type: 25,
                        stat_value: spell_effects[0].points_upper.abs() as u16,
                    });
                } else if spell_desc.contains("attack power") {
                    stats.push(Stat {
                        stat_type: 9,
                        stat_value: spell_effects[0].points_upper.abs() as u16,
                    });
                } else if spell_desc.contains("defense rating") {
                    stats.push(Stat {
                        stat_type: 22,
                        stat_value: spell_effects[0].points_upper.abs() as u16,
                    });
                } else if spell_desc.contains("dodge rating") {
                    stats.push(Stat {
                        stat_type: 10,
                        stat_value: spell_effects[0].points_upper.abs() as u16,
                    });
                } else if spell_desc.contains("parry rating") {
                    stats.push(Stat {
                        stat_type: 11,
                        stat_value: spell_effects[0].points_upper.abs() as u16,
                    });
                } else if spell_desc.contains("block rating") {
                    stats.push(Stat {
                        stat_type: 12,
                        stat_value: spell_effects[0].points_upper.abs() as u16,
                    });
                } else if spell_desc.contains("block chance") {
                    stats.push(Stat {
                        stat_type: 26,
                        stat_value: spell_effects[0].points_upper.abs() as u16,
                    });
                } else if spell_desc.contains("damage done by shadow spells") {
                    stats.push(Stat {
                        stat_type: 20,
                        stat_value: spell_effects[0].points_upper.abs() as u16,
                    });
                } else if spell_desc.contains("damage done by arcane spells") {
                    stats.push(Stat {
                        stat_type: 19,
                        stat_value: spell_effects[0].points_upper.abs() as u16,
                    });
                } else if spell_desc.contains("damage done by fire spells") {
                    stats.push(Stat {
                        stat_type: 18,
                        stat_value: spell_effects[0].points_upper.abs() as u16,
                    });
                } else if spell_desc.contains("damage done by nature spells") {
                    stats.push(Stat {
                        stat_type: 17,
                        stat_value: spell_effects[0].points_upper.abs() as u16,
                    });
                } else if spell_desc.contains("damage done by frost spells") {
                    stats.push(Stat {
                        stat_type: 16,
                        stat_value: spell_effects[0].points_upper.abs() as u16,
                    });
                } else if spell_desc.contains("damage done by holy spells") {
                    stats.push(Stat {
                        stat_type: 15,
                        stat_value: spell_effects[0].points_upper.abs() as u16,
                    });
                } else if spell_desc.contains("the block value of your shield") {
                    stats.push(Stat {
                        stat_type: 44,
                        stat_value: spell_effects[0].points_upper.abs() as u16,
                    });
                }
            } else if spell_desc.contains("restores") {
                if spell_desc.contains("mana per") {
                    stats.push(Stat {
                        stat_type: 21,
                        stat_value: spell_effects[0].points_upper.abs() as u16,
                    });
                } else if spell_desc.contains("health per") {
                    stats.push(Stat {
                        stat_type: 43,
                        stat_value: spell_effects[0].points_upper.abs() as u16,
                    });
                }
            } else if spell_desc.contains("attacks ignore") && spell_desc.contains("opponent's armor") {
                stats.push(Stat {
                    stat_type: 41,
                    stat_value: spell_effects[0].points_upper.abs() as u16,
                });
            }
        }
        stats
    }
}

fn format_duration(dictionary: &Dictionary, language_id: u8, duration: u32) -> String {
    let language = Language::from_u8(language_id - 1);

    match duration.cmp(&(24 * 60 * 60 * 1000)) {
        Ordering::Greater => {
            return str_util::strformat::fmt(dictionary.get("days", language), &[&(duration / (24 * 60 * 60 * 1000)).to_string()]);
        },
        Ordering::Equal => {
            return dictionary.get("day", language);
        },
        _ => {},
    };

    match duration.cmp(&(60 * 60 * 1000)) {
        Ordering::Greater => {
            return str_util::strformat::fmt(dictionary.get("hours", language), &[&(duration / (60 * 60 * 1000)).to_string()]);
        },
        Ordering::Equal => {
            return dictionary.get("hour", language);
        },
        _ => {},
    };

    match duration.cmp(&(60 * 1000)) {
        Ordering::Greater => {
            return str_util::strformat::fmt(dictionary.get("minutes", language), &[&(duration / (60 * 1000)).to_string()]);
        },
        Ordering::Equal => {
            return dictionary.get("minute", language);
        },
        _ => {},
    };

    match duration.cmp(&1000) {
        Ordering::Greater => {
            return str_util::strformat::fmt(dictionary.get("seconds", language), &[&(duration / (1000)).to_string()]);
        },
        Ordering::Equal => {
            return dictionary.get("second", language);
        },
        _ => {},
    };

    str_util::strformat::fmt(dictionary.get("milliseconds", language), &[&(duration / (24 * 60 * 60 * 1000)).to_string()])
}
