use crate::modules::account::Account;
use crate::modules::utility::domain_value::Paste;
use crate::modules::utility::dto::{PasteDto, UtilityFailure};
use crate::modules::utility::Utility;
use crate::params;
use crate::util::database::{Execute, Select};

pub trait RetrieveAddonPaste {
    fn get_addon_paste(&self, id: u32) -> Option<Paste>;
    fn get_addon_pastes(&self) -> Vec<Paste>;
}

pub trait UpdateAddonPaste {
    fn replace_addon_paste(&self, db_main: &mut (impl Select + Execute), paste: PasteDto, member_id: u32, account: &Account) -> Result<u32, UtilityFailure>;
    fn delete_addon_paste(&self, db_main: &mut impl Execute, paste_id: u32, member_id: u32, account: &Account) -> Result<(), UtilityFailure>;
}

impl RetrieveAddonPaste for Utility {
    fn get_addon_paste(&self, id: u32) -> Option<Paste> {
        let addon_pastes = self.addon_pastes.read().unwrap();
        addon_pastes.get(&id).cloned()
    }

    fn get_addon_pastes(&self) -> Vec<Paste> {
        let addon_pastes = self.addon_pastes.read().unwrap();
        addon_pastes.iter().map(|(_, paste)| paste.clone()).collect()
    }
}

impl UpdateAddonPaste for Utility {
    fn replace_addon_paste(&self, db_main: &mut (impl Select + Execute), paste: PasteDto, member_id: u32, account: &Account) -> Result<u32, UtilityFailure> {
        if let Some(id) = paste.id {
            let mut addon_pastes = self.addon_pastes.write().unwrap();
            let mut i_paste = addon_pastes.get_mut(&id).ok_or(UtilityFailure::InvalidInput)?;
            if i_paste.member_id != member_id {
                let members = account.member.read().unwrap();
                let member = members.get(&member_id).unwrap();
                if (member.access_rights & 1) != 1 {
                    return Err(UtilityFailure::InvalidInput);
                }
            }
            i_paste.title = paste.title.clone();
            i_paste.addon_name = paste.addon_name.clone();
            i_paste.expansion_id = paste.expansion_id;
            i_paste.description = paste.description.clone();
            i_paste.content = paste.content.clone();
            i_paste.tags = paste.tags.clone();
            db_main.execute_wparams("UPDATE utility_addon_paste SET `title`=:title, `expansion_id`=:expansion_id, \
            `addon_name`=:addon_name, `tags`=:tags, `description`=:description, `content`=:content \
            WHERE `id`=:id", params!("id" => id, "title" => paste.title.clone(), "expansion_id" => paste.expansion_id,
            "addon_name" => paste.addon_name.clone(), "tags" => paste.tags.iter().map(|id| id.to_string()).collect::<Vec<String>>().join(","),
            "description" => paste.description.clone(), "content" => paste.content));
            Ok(id)
        } else {
            let params = params!("title" => paste.title.clone(), "expansion_id" => paste.expansion_id, "addon_name" => paste.addon_name.clone(),
            "tags" => paste.tags.iter().map(|id| id.to_string()).collect::<Vec<String>>().join(","), "description" => paste.description.clone(),
            "content" => paste.content.clone(), "member_id" => member_id);
            if db_main.execute_wparams("INSERT INTO utility_addon_paste (`title`, `expansion_id`, `addon_name`, `tags`, `description`, `content`, `member_id`) \
             VALUES (:title, :expansion_id, :addon_name, :tags, :description, :content, :member_id)", params) {
                let id: u32 = db_main.select_value("SELECT MAX(id) FROM utility_addon_paste", |mut row| row.take(0).unwrap()).unwrap();
                let mut addon_pastes = self.addon_pastes.write().unwrap();
                addon_pastes.insert(id, Paste {
                    id,
                    title: paste.title.clone(),
                    expansion_id: paste.expansion_id,
                    addon_name: paste.addon_name.clone(),
                    tags: paste.tags,
                    description: paste.description.clone(),
                    content: paste.content.clone(),
                    member_id,
                });
                return Ok(id);
            }
            Err(UtilityFailure::InvalidInput)
        }
    }

    fn delete_addon_paste(&self, db_main: &mut impl Execute, paste_id: u32, member_id: u32, account: &Account) -> Result<(), UtilityFailure> {
        let mut addon_pastes = self.addon_pastes.write().unwrap();
        if !addon_pastes.contains_key(&paste_id) {
            return Err(UtilityFailure::InvalidInput);
        } else {
            let paste = addon_pastes.get(&paste_id).unwrap();
            if paste.member_id != member_id {
                let members = account.member.read().unwrap();
                let member = members.get(&member_id).unwrap();
                if (member.access_rights & 1) != 1 {
                    return Err(UtilityFailure::InvalidInput);
                }
            }
        }
        addon_pastes.remove(&paste_id);
        db_main.execute_wparams("DELETE FROM utility_addon_paste WHERE id=:id",
                                params!("id" => paste_id));
        Ok(())
    }
}