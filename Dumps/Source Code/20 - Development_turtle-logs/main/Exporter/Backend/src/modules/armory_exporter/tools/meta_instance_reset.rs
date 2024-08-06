use crate::modules::transport_layer::InstanceReset;
use crate::modules::util::Select;
use crate::modules::ArmoryExporter;

pub trait RetrieveMetaInstanceReset {
    fn get_instance_reset(&self, db_characters: &mut impl Select) -> Vec<InstanceReset>;
}

impl RetrieveMetaInstanceReset for ArmoryExporter {
    fn get_instance_reset(&self, db_characters: &mut impl Select) -> Vec<InstanceReset> {
        db_characters.select("SELECT mapid, difficulty, resettime FROM instance_reset", |mut row| InstanceReset {
            map_id: row.take(0).unwrap(),
            difficulty: row.take(1).unwrap(),
            reset_time: row.take(2).unwrap(),
        })
    }
}
