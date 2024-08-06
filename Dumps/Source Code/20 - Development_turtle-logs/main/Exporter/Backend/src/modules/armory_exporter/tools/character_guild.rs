use crate::modules::armory_exporter::domain_value::CharacterGuildTable;
use crate::modules::util::Select;
use crate::modules::ArmoryExporter;
use crate::params;

pub trait RetrieveCharacterGuild {
    fn get_character_guild(&self, db_characters: &mut impl Select, character_id: u32) -> Option<CharacterGuildTable>;
}

impl RetrieveCharacterGuild for ArmoryExporter {
    fn get_character_guild(&self, db_characters: &mut impl Select, character_id: u32) -> Option<CharacterGuildTable> {
        db_characters.select_wparams_value(
            "SELECT a.guildid, a.name, c.rid, c.rname FROM guild a JOIN guild_member b ON a.guildid = b.guildid JOIN guild_rank c ON b.rank = c.rid AND a.guildid = c.guildid WHERE b.guid=:character_id",
            move |mut row| CharacterGuildTable {
                character_id,
                guild_id: row.take(0).unwrap(),
                guild_name: row.take(1).unwrap(),
                rank_index: row.take(2).unwrap(),
                rank_name: row.take(3).unwrap(),
            },
            params!(
              "character_id" => character_id
            ),
        )
    }
}
