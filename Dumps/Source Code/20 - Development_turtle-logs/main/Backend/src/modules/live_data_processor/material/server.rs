use crate::modules::live_data_processor::domain_value::{Event, NonCommittedEvent, Unit, UnitInstance};
use crate::modules::live_data_processor::dto::InstanceResetDto;
use crate::modules::live_data_processor::material::Attempt;
use crate::params;
use crate::util::database::Select;
use std::collections::{BTreeSet, HashMap, VecDeque};

pub struct Server {
    pub server_id: u32,
    pub expansion_id: u8,

    // Meta Data
    pub summons: HashMap<u64, Unit>,
    // TODO: This grows uncontrollable
    // Key: (instance_id, member_id)
    pub active_instances: HashMap<(u32, u32), UnitInstance>,
    pub unit_instance_id: HashMap<u64, u32>,
    pub instance_resets: HashMap<u16, InstanceResetDto>,
    // instance_meta_id => [(character_id, history_id)]
    pub instance_participants: HashMap<u32, BTreeSet<u32>>,
    // Per instance there is a set of active attempts and when they began,
    // though most of the times only 1
    // Key: (instance_id, member_id)
    pub active_attempts: HashMap<(u32, u32), HashMap<u32, Attempt>>,

    // Used to handle unordered events
    pub subject_prepend_mode_set: BTreeSet<u64>, // Contains server_uid of subject
    pub post_processing_last_precessed_event_id: HashMap<u32, u32>,

    // Events
    // Mapping player to non committed event
    pub non_committed_events: HashMap<u64, NonCommittedEvent>,
    // Key: (instance_id, member_id)
    pub committed_events: HashMap<(u32, u32), VecDeque<Event>>,
    pub committed_events_count: HashMap<(u32, u32), u32>,
    pub recently_committed_spell_cast_and_aura_applications: HashMap<(u32, u32), VecDeque<Event>>,

    // PERFORMANCE
    pub cache_unit: HashMap<u64, Unit>,
}

impl Server {
    pub fn new(server_id: u32, expansion_id: u8) -> Self {
        Server {
            server_id,
            expansion_id,
            // TODO: Preserve all data when the app is restarted?
            summons: HashMap::new(),
            active_instances: HashMap::new(),
            unit_instance_id: HashMap::new(),
            instance_resets: HashMap::new(),
            instance_participants: HashMap::new(),
            non_committed_events: HashMap::new(),
            committed_events: HashMap::new(),
            committed_events_count: HashMap::new(),
            subject_prepend_mode_set: BTreeSet::new(),
            active_attempts: HashMap::new(),
            post_processing_last_precessed_event_id: HashMap::new(),
            recently_committed_spell_cast_and_aura_applications: HashMap::new(),
            cache_unit: HashMap::new(),
        }
    }

    pub fn init(mut self, db_main: &mut impl Select) -> Self {
        // Load active instances
        db_main
            .select_wparams(
                "SELECT A.id, start_ts, map_id, instance_id, B.member_id, upload_id FROM instance_meta A JOIN instance_uploads B ON A.upload_id = B.id WHERE expired IS NULL AND server_id=:server_id",
                |mut row| UnitInstance {
                    instance_meta_id: row.take(0).unwrap(),
                    entered: row.take(1).unwrap(),
                    map_id: row.take(2).unwrap(),
                    instance_id: row.take(3).unwrap(),
                    uploaded_user: row.take(4).unwrap(),
                    ready_to_zip: false,
                    upload_id: row.take(5).unwrap()
                },
                params!("server_id" => self.server_id),
            )
            .into_iter()
            .for_each(|unit_instance| {
                self.instance_participants.insert(unit_instance.instance_meta_id, BTreeSet::new());
                self.active_instances.insert((unit_instance.instance_id, unit_instance.uploaded_user), unit_instance);
            });

        // Load current_event_id count
        db_main
            .select_wparams(
                "SELECT instance_id, last_event_id, B.member_id FROM instance_meta A JOIN instance_uploads B ON A.upload_id = B.id WHERE expired IS NULL AND server_id=:server_id",
                |mut row| (row.take::<u32, usize>(0).unwrap(), row.take::<u32, usize>(1).unwrap(), row.take::<u32, usize>(2).unwrap()),
                params!("server_id" => self.server_id),
            )
            .into_iter()
            .for_each(|(instance_id, last_event_id, member_id)| {
                self.committed_events_count.insert((instance_id, member_id), last_event_id);
            });

        // Load active instance participants
        db_main
            .select_wparams(
                "SELECT A.id, B.character_id FROM instance_meta A JOIN instance_participants B ON A.id = B.instance_meta_id WHERE A.expired IS NULL AND A.server_id=:server_id",
                |mut row| (row.take::<u32, usize>(0).unwrap(), row.take::<u32, usize>(1).unwrap()),
                params!("server_id" => self.server_id),
            )
            .into_iter()
            .for_each(|(instance_meta_id, character_id)| {
                self.instance_participants.get_mut(&instance_meta_id).unwrap().insert(character_id);
            });

        // Load instance reset data
        db_main
            .select_wparams(
                "SELECT map_id, difficulty, reset_time FROM armory_instance_resets WHERE server_id=:server_id",
                |mut row| InstanceResetDto {
                    map_id: row.take(0).unwrap(),
                    difficulty: row.take(1).unwrap(),
                    reset_time: row.take(2).unwrap(),
                },
                params!("server_id" => self.server_id),
            )
            .into_iter()
            .for_each(|result| {
                self.instance_resets.insert(result.map_id, result);
            });
        self
    }
}
