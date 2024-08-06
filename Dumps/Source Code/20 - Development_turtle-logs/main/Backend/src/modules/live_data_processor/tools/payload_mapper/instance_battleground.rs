use crate::modules::live_data_processor::dto::{InstanceBattleground, LiveDataProcessorFailure};
use crate::modules::live_data_processor::tools::byte_reader;

pub trait MapInstanceBattleground {
    fn to_instance_battleground(&self) -> Result<InstanceBattleground, LiveDataProcessorFailure>;
}

impl MapInstanceBattleground for [u8] {
    fn to_instance_battleground(&self) -> Result<InstanceBattleground, LiveDataProcessorFailure> {
        if self.len() != 17 {
            return Err(LiveDataProcessorFailure::InvalidInput);
        }
        Ok(InstanceBattleground {
            map_id: byte_reader::read_u32(&self[0..4])?,
            instance_id: byte_reader::read_u32(&self[4..8])?,
            winner: self[8],
            score_alliance: byte_reader::read_u32(&self[9..13])?,
            score_horde: byte_reader::read_u32(&self[13..17])?,
        })
    }
}
