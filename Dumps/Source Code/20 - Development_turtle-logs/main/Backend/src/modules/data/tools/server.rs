use crate::modules::data::domain_value::Server;
use crate::modules::data::material::Init;
use crate::modules::data::{dto::AvailableServer, Data};
use crate::params;
use crate::util::database::{Execute, Select};

pub trait RetrieveServer {
    fn get_server(&self, id: u32) -> Option<AvailableServer>;
    fn get_server_by_name(&self, server_name: String) -> Option<AvailableServer>;
    fn get_all_servers(&self) -> Vec<AvailableServer>;
    fn reload_server(&self, db_main: &mut impl Select);
    fn get_internal_server_by_retail_id(&self, retail_id: u32) -> Option<Server>;
    fn set_internal_retail_server(&self, db_main: &mut (impl Execute + Select), server_name: String, expansion_id: u8, patch: String, retail_id: u32) -> Server;
}

impl RetrieveServer for Data {
    fn get_server(&self, id: u32) -> Option<AvailableServer> {
        let servers = self.servers.read().unwrap();
        servers.get(&id).map(|server| AvailableServer::from_server(server))
    }

    fn get_server_by_name(&self, server_name: String) -> Option<AvailableServer> {
        let servers = self.servers.read().unwrap();
        servers.iter().find(|(_, server)| server.name == server_name).map(|(_, server)| AvailableServer::from_server(server))
    }

    fn get_all_servers(&self) -> Vec<AvailableServer> {
        let servers = self.servers.read().unwrap();
        servers.iter().map(|(_, server)| AvailableServer::from_server(server)).collect()
    }

    fn reload_server(&self, db_main: &mut impl Select) {
        let mut servers = self.servers.write().unwrap();
        (*servers).init(db_main);
    }

    fn get_internal_server_by_retail_id(&self, retail_id: u32) -> Option<Server> {
        let servers = self.servers.read().unwrap();
        servers.iter().find(|(_, server)| server.retail_id.contains(&retail_id)).map(|(_, server)| server.clone())
    }

    fn set_internal_retail_server(&self, db_main: &mut (impl Execute + Select), server_name: String, expansion_id: u8, patch: String, retail_id: u32) -> Server {
        db_main.execute_wparams(
            "INSERT INTO data_server (`expansion_id`, `server_name`, `patch`, `retail_id`, `archived`) VALUES (:expansion_id, :server_name, :patch, :retail_id, :archived)",
            params!(
                "expansion_id" => expansion_id,
                "server_name" => server_name,
                "patch" => patch,
                "retail_id" => Some(retail_id),
                "archived" => 0
            ),
        );
        self.reload_server(db_main);
        self.get_internal_server_by_retail_id(retail_id).unwrap()
    }
}
