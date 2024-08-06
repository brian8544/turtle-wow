use std::collections::HashMap;
use std::str::FromStr;
use std::sync::RwLock;

use crate::modules::utility::domain_value::Paste;
use crate::util::database::Select;

#[derive(Debug)]
pub struct Utility {
    pub addon_pastes: RwLock<HashMap<u32, Paste>>
}

impl Default for Utility {
    fn default() -> Self {
        Utility { addon_pastes: Default::default() }
    }
}

impl Utility {
    pub fn init(self, db: &mut impl Select) -> Self {
        {
            let mut addon_pastes = self.addon_pastes.write().unwrap();
            db.select("SELECT * FROM utility_addon_paste", |mut row| {
                Paste {
                    id: row.take(0).unwrap(),
                    title: row.take(1).unwrap(),
                    expansion_id: row.take(2).unwrap(),
                    addon_name: row.take(3).unwrap(),
                    tags: row.take::<String, usize>(4).unwrap().split(",").map(|num| u32::from_str(num).unwrap()).collect(),
                    description: row.take(5).unwrap(),
                    content: row.take(6).unwrap(),
                    member_id: row.take(7).unwrap()
                }
            }).into_iter().for_each(|paste| {
                addon_pastes.insert(paste.id, paste);
            });
        }
        self
    }
}
