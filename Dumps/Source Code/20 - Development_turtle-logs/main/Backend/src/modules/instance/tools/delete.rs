use crate::modules::instance::dto::InstanceFailure;
use crate::modules::instance::Instance;
use crate::params;
use crate::util::database::{Execute, Select};
use std::fs;

pub trait DeleteInstance {
    fn delete_instance(&self, db_main: &mut (impl Execute + Select), instance_meta_id: u32, member_id: u32) -> Result<(), InstanceFailure>;
}

impl DeleteInstance for Instance {
    fn delete_instance(&self, db_main: &mut (impl Execute + Select), instance_meta_id: u32, member_id: u32) -> Result<(), InstanceFailure> {
        let storage_path = std::env::var("INSTANCE_STORAGE_PATH").expect("storage path must be set");
        let server_id: Option<u32> = db_main.select_wparams_value(
            "SELECT server_id FROM instance_meta WHERE id=:instance_meta_id",
            |mut row| row.take::<u32, usize>(0).unwrap(),
            params!("instance_meta_id" => instance_meta_id),
        );

        if let Some(server_id) = server_id {
            if db_main.execute_wparams(
                "DELETE A FROM instance_meta A \
                JOIN instance_uploads B ON A.upload_id = B.id \
                JOIN account_member C ON (B.member_id = C.id OR (C.access_rights & 1) = 1) \
                WHERE A.id=:instance_meta_id AND C.id=:member_id",
                params!(
                    "instance_meta_id" => instance_meta_id,
                    "member_id" => member_id
                ),
            ) {
                self.delete_instance_meta(instance_meta_id);
                let _ = fs::remove_dir_all(&format!("{}/{}/{}", storage_path, server_id, instance_meta_id));
                let _ = fs::remove_file(&format!("{}/{}/{}.zip", storage_path, server_id, instance_meta_id));
                return Ok(());
            }
        }
        Err(InstanceFailure::InvalidInput)
    }
}
