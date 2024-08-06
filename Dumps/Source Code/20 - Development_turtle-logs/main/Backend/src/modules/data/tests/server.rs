use crate::modules::data::domain_value::Server;
use crate::modules::data::{tools::RetrieveServer, Data};

#[test]
fn get_server() {
    let data = Data::default();
    let server_id = 1;
    let server = Server {
        id: server_id,
        expansion_id: 1,
        name: "sdfs".to_string(),
        owner: None,
        patch: "1.12.1".to_string(),
        retail_id: None,
        archived: false
    };
    {
        let mut servers = data.servers.write().unwrap();
        servers.insert(server_id, server.clone());
    }

    let server_res = data.get_server(server_id);
    assert!(server_res.is_some());
    let server_res = server_res.unwrap();
    assert_eq!(server_res.id, server.id);
    assert_eq!(server_res.expansion_id, server.expansion_id);
    assert_eq!(server_res.name, server.name);
    assert_eq!(server_res.patch, server.patch);
    assert_eq!(server_res.archived, server.archived);
    let no_server = data.get_server(0);
    assert!(no_server.is_none());
}

#[test]
fn get_all_servers() {
    let data = Data::default();
    let servers = data.get_all_servers();
    assert!(servers.is_empty());
}
