use crate::modules::data::domain_value::ItemSocket;
use crate::modules::data::{tools::RetrieveItemSocket, Data};
use std::collections::HashMap;

#[test]
fn get_item_socket() {
    let mut data = Data::default();
    let expansion_id = 2;
    let item_id = 21846;
    let item_socket = ItemSocket {
        expansion_id,
        item_id,
        bonus: 1,
        slots: vec![],
    };
    let mut hashmap = HashMap::new();
    hashmap.insert(item_id, item_socket.clone());
    data.item_sockets.push(hashmap);

    let item_socket_res = data.get_item_socket(expansion_id, item_id);
    assert!(item_socket_res.is_some());
    assert_eq!(item_socket_res.unwrap(), item_socket);
    let no_item_socket = data.get_item_socket(0, 0);
    assert!(no_item_socket.is_none());
}
