use chrono::NaiveDateTime;

use crate::modules::armory::Armory;
use crate::modules::data::Data;
use crate::modules::data::tools::RetrieveServer;
use crate::modules::utility::Utility;

pub trait SiteMap {
    fn build_character_site_map(&self, armory: &Armory, data: &Data, page: u32) -> String;
    fn build_guild_site_map(&self, armory: &Armory, data: &Data, page: u32) -> String;
    fn build_pastebin_site_map(&self, page: u32) -> String;
}

impl SiteMap for Utility {
    fn build_character_site_map(&self, armory: &Armory, data: &Data, page: u32) -> String {
        static NUM_PER_PAGE: usize = 40000;
        let mut result_str = Vec::with_capacity(NUM_PER_PAGE * 4 + 3);
        result_str.push("<?xml version=\"1.0\" encoding=\"UTF-8\"?>".to_owned());
        result_str.push("<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">".to_owned());
        let characters = armory.characters.read().unwrap();
        characters.iter().filter(|(_, character)| character.last_update.is_some())
            .skip(((page - 1) as usize) * NUM_PER_PAGE).take(NUM_PER_PAGE)
            .for_each(|(_, character)| {
                result_str.push("<url>".to_owned());
                result_str.push(format!("<loc>{}</loc>", format!("https://legacyplayers.com/armory/character/{}/{}",
                                                                 urlencoding::encode(&data.get_server(character.server_id).unwrap().name),
                                                                 urlencoding::encode(&character.last_update.as_ref().unwrap().character_name))
                    .replace("&", "&amp;").replace("'", "&apos;")
                    .replace("\"", "&quot;").replace("<", "&lt;").replace(">", "&gt;")));
                result_str.push(format!("<lastmod>{}</lastmod>", NaiveDateTime::from_timestamp(character.last_update.as_ref().unwrap().timestamp as i64, 0)
                    .format("%Y-%m-%d").to_string()));
                result_str.push("</url>".to_owned());
            });
        result_str.push("</urlset>".to_owned());
        result_str.join("\r\n")
    }

    fn build_guild_site_map(&self, armory: &Armory, data: &Data, page: u32) -> String {
        static NUM_PER_PAGE: usize = 40000;
        let mut result_str = Vec::with_capacity(NUM_PER_PAGE * 3 + 3);
        result_str.push("<?xml version=\"1.0\" encoding=\"UTF-8\"?>".to_owned());
        result_str.push("<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">".to_owned());
        let guilds = armory.guilds.read().unwrap();
        guilds.iter().skip(((page - 1) as usize) * NUM_PER_PAGE).take(NUM_PER_PAGE)
            .for_each(|(_, guild)| {
                result_str.push("<url>".to_owned());
                result_str.push(format!("<loc>{}</loc>", format!("https://legacyplayers.com/armory/guild/{}/{}",
                                                                 urlencoding::encode(&data.get_server(guild.server_id).unwrap().name),
                                                                 urlencoding::encode(&guild.name))
                    .replace("&", "&amp;").replace("'", "&apos;")
                    .replace("\"", "&quot;").replace("<", "&lt;").replace(">", "&gt;")));
                result_str.push("</url>".to_owned());
            });
        result_str.push("</urlset>".to_owned());
        result_str.join("\r\n")
    }

    fn build_pastebin_site_map(&self, page: u32) -> String {
        static NUM_PER_PAGE: usize = 40000;
        let mut result_str = Vec::with_capacity(NUM_PER_PAGE * 3 + 3);
        result_str.push("<?xml version=\"1.0\" encoding=\"UTF-8\"?>".to_owned());
        result_str.push("<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">".to_owned());
        let addon_pastes = self.addon_pastes.read().unwrap();
        addon_pastes.iter().skip(((page - 1) as usize) * NUM_PER_PAGE).take(NUM_PER_PAGE)
            .for_each(|(_, paste)| {
                result_str.push("<url>".to_owned());
                result_str.push(format!("<loc>{}</loc>", format!("https://legacyplayers.com/tools/addon_pastebin/viewer/{}", paste.id)
                    .replace("&", "&amp;").replace("'", "&apos;")
                    .replace("\"", "&quot;").replace("<", "&lt;").replace(">", "&gt;")));
                result_str.push("</url>".to_owned());
            });
        result_str.push("</urlset>".to_owned());
        result_str.join("\r\n")
    }
}