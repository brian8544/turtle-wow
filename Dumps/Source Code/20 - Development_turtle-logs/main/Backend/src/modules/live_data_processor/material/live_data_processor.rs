use crate::modules::live_data_processor::material::Server;
use crate::params;
use crate::util::database::Select;
use std::collections::HashMap;
use std::sync::RwLock;

pub struct LiveDataProcessor {
    pub servers: RwLock<HashMap<u32, RwLock<Server>>>,
    pub upload_progress: RwLock<HashMap<u32, u8>>
}

impl Default for LiveDataProcessor {
    fn default() -> Self {
        LiveDataProcessor {
            servers: RwLock::new(HashMap::new()),
            upload_progress: RwLock::new(HashMap::new())
        }
    }
}

impl LiveDataProcessor {
    pub fn init(self, db_main: &mut impl Select) -> Self {
        {
            let mut servers = self.servers.write().unwrap();
            db_main
                .select("SELECT id, expansion_id FROM data_server", |mut row| (row.take::<u32, usize>(0).unwrap(), row.take::<u8, usize>(1).unwrap()))
                .into_iter()
                .for_each(|(server_id, expansion_id)| {
                    servers.insert(server_id, RwLock::new(Server::new(server_id, expansion_id).init(db_main)));
                });
        }
        self
    }

    pub fn create_server_if_not_exist(&self, db_main: &mut impl Select, server_id: u32) {
        let create_server = {
            let servers = self.servers.read().unwrap();
            !servers.contains_key(&server_id)
        };

        if create_server {
            let mut servers = self.servers.write().unwrap();
            let (server_id, expansion_id) = db_main
                .select_wparams_value(
                    "SELECT id, expansion_id FROM data_server WHERE id = :server_id",
                    |mut row| (row.take::<u32, usize>(0).unwrap(), row.take::<u8, usize>(1).unwrap()),
                    params!("server_id" => server_id),
                )
                .unwrap();
            servers.insert(server_id, RwLock::new(Server::new(server_id, expansion_id).init(db_main)));
        }
    }
}
