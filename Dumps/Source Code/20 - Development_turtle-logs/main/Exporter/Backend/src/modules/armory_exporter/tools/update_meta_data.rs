use crate::modules::util::Execute;
use crate::modules::ArmoryExporter;
use crate::params;

pub trait UpdateMetaData {
    fn update_meta_data(&self, db_lp_consent: &mut impl Execute);
}

impl UpdateMetaData for ArmoryExporter {
    fn update_meta_data(&self, db_lp_consent: &mut impl Execute) {
        db_lp_consent.execute_wparams(
            "UPDATE meta_data SET last_fetch=:last_fetch",
            params!(
              "last_fetch" => self.last_fetch_time
            ),
        );
    }
}
