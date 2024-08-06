use crate::modules::live_data_processor::domain_value::HitType;

pub fn parse_trailer(trailer: &str) -> Vec<(Option<u32>, HitType)> {
    let mut result = Vec::new();
    for ind_trailer in trailer.split(") (") {
        let ind_trailer = ind_trailer.replace("(", "").replace(")", "");
        if ind_trailer == "glancing" {
            result.push((None, HitType::Glancing));
        } else if ind_trailer == "crushing" {
            result.push((None, HitType::Crushing));
        } else if !ind_trailer.is_empty() {
            let parts = ind_trailer.split(' ').collect::<Vec<&str>>();

            // Some private servers seems to have implemented "Vulnerability Bonus" which was removed on 1.9
            // It is decided to ignore this vulnerability trailer.
            if parts[1] == "vulnerability" {
                continue;
            }

            if let Ok(amount) = u32::from_str_radix(&parts[0], 10) {
                let hit_type = match parts[1] {
                    "resisted" => HitType::PartialResist,
                    "blocked" => HitType::PartialBlock,
                    "absorbed" => HitType::PartialAbsorb,
                    _ => unreachable!(),
                };
                result.push((Some(amount), hit_type));
            }
        }
    }
    result
}
