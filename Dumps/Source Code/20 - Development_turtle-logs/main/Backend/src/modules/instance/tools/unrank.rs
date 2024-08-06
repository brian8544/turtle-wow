use crate::modules::instance::dto::InstanceFailure;
use crate::modules::instance::Instance;
use crate::params;
use crate::util::database::Execute;
use std::collections::HashMap;

pub trait UnrankAttempt {
    fn unrank_attempt(&self, db_main: &mut impl Execute, attempt_id: u32) -> Result<(), InstanceFailure>;
}

impl UnrankAttempt for Instance {
    fn unrank_attempt(&self, db_main: &mut impl Execute, attempt_id: u32) -> Result<(), InstanceFailure> {
        let i_m_i;
        {
            let mut attempts = self.instance_kill_attempts.write().unwrap();
            let (instance_meta_id, instance_attempts) = attempts.1.iter_mut()
                .find(|(_, i_attempts)| i_attempts.iter().any(|attempt| attempt.attempt_id == attempt_id))
                .ok_or_else(|| InstanceFailure::InvalidInput)?;
            let attempt = instance_attempts.iter_mut().find(|attempt| attempt.attempt_id == attempt_id).unwrap();
            attempt.rankable = false;
            let _ = db_main.execute_wparams("UPDATE `main`.`instance_attempt` SET rankable = 0 WHERE id=:attempt_id", params!("attempt_id" => attempt_id));
            i_m_i = *instance_meta_id;
        }

        {
            let mut speed_runs = self.speed_runs.write().unwrap();
            if let Some(index) = speed_runs.iter().position(|speed_run| speed_run.instance_meta_id == i_m_i) {
                speed_runs.remove(index);
            }
        }

        {
            let mut speed_kills = self.speed_kills.write().unwrap();
            if let Some(index) = speed_kills.iter().position(|speed_kill| speed_kill.attempt_id == attempt_id) {
                speed_kills.remove(index);
            }
        }

        {
            let mut instance_rankings_dps = self.instance_rankings_dps.write().unwrap();
            *instance_rankings_dps = (0, HashMap::new());
        }

        {
            let mut instance_rankings_hps = self.instance_rankings_hps.write().unwrap();
            *instance_rankings_hps = (0, HashMap::new());
        }

        {
            let mut instance_rankings_tps = self.instance_rankings_tps.write().unwrap();
            *instance_rankings_tps = (0, HashMap::new());
        }

        Ok(())
    }
}