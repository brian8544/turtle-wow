use grouping_by::GroupingBy;

use crate::modules::armory::Armory;
use crate::modules::armory::material::Guild;
use crate::modules::armory::tools::{GetCharacter, GetGuild};
use crate::util::database::Select;

pub trait FindInstanceGuild {
    fn find_instance_guild(&self, db_main: &mut impl Select, armory: &Armory, timestamp: u64) -> Option<Guild>;
}

// Where u32 is a character_id
impl FindInstanceGuild for Vec<u32> {
    fn find_instance_guild(&self, db_main: &mut impl Select, armory: &Armory, timestamp: u64) -> Option<Guild> {
        let valid_participants = &self.iter()
            .filter_map(|character_id| armory.get_character_moment(db_main, *character_id, timestamp))
            .filter(|history| history.character_info.hero_class_id != 12)
            .map(|history| history.character_guild.map(|inner| inner.guild_id))
            .collect::<Vec<Option<u32>>>();
        let same_guild_fraction = 0.5;
        for (guild_id, group) in &valid_participants.iter().grouping_by(|character_guild_id| *character_guild_id) {
            if (group.len() as f64) / (valid_participants.len() as f64) >= same_guild_fraction {
                return guild_id.and_then(|guild_id| armory.get_guild(guild_id));
            }
        }
        None
    }
}
