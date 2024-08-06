for (enchant_id, enchant) in data.enchants.get(0).unwrap() {
let spell_str = data.get_localization(1, enchant.localization_id).unwrap().content.to_lowercase();

let mut stats: Vec<Stat> = Vec::new();

let re = Regex::new(r"(\d+)%? (.+)$").unwrap();
let re2 = Regex::new(r"([A-Za-z\s]+) \+?(\d+)%?$").unwrap();
for spell_desc_substr in spell_str
.replace("mana regen 4", "4 mana")
.replace("damage and healing spells", "damage healing spells")
.replace("shadow and frost spell power", "shadow frost spell power")
.replace("arcane and fire spell power", "arcane fire spell power")
.replace("+10/14 sta/fr", "+10 stamina and +14 frost resistance")
.replace("spi/fr +10/14", "+10 spirit and +14 frost resistance")
.replace("sta/fr +10/14", "+10 stamina and +14 frost resistance")
.replace("int/fr +10/14", "+10 intellect and +14 frost resistance")
.replace("str/fr +10/14", "+10 strength and +14 frost resistance")
.replace("agi/fr +10/14", "+10 agility and +14 frost resistance")
.replace("ac/fr +110/14", "+14 frost resistance") // What is ac?
.replace("str/sta +10/10", "+10 strength and +10 stamina")
.replace("str/sta/ac/fr +10/10/110/15", "+10 strength and +10 stamina and +15 frost resistance")
.replace("int/spi/mana/fr +10/10/100/15", "+10 intellect and +10 spirit and +15 frost resistance")
.replace("&", " and ")
.replace("/", " and ")
.split(" and ") {
if re.is_match(spell_desc_substr) || re2.is_match(spell_desc_substr) {
let specification;
let amount;
if re.is_match(spell_desc_substr) {
let cap = re.captures_iter(spell_desc_substr).next().unwrap();
specification = cap[2].to_lowercase();
amount = cap[1].to_lowercase().parse::<u16>().unwrap();
} else {
let cap = re2.captures_iter(spell_desc_substr).next().unwrap();
specification = cap[1].to_lowercase();
amount = cap[2].to_lowercase().parse::<u16>().unwrap();
}
if specification.contains("holy resistance") {
stats.push(Stat { stat_type: 1, stat_value: amount });
} else if specification.contains("fire resist") {
stats.push(Stat { stat_type: 2, stat_value: amount });
} else if specification.contains("nature resist") {
stats.push(Stat { stat_type: 3, stat_value: amount });
} else if specification.contains("frost resist") {
stats.push(Stat { stat_type: 4, stat_value: amount });
} else if specification.contains("arcane resist") {
stats.push(Stat { stat_type: 5, stat_value: amount });
} else if specification.contains("shadow resist") {
stats.push(Stat { stat_type: 6, stat_value: amount });
} else if specification.contains("spell crit") {
stats.push(Stat { stat_type: 24, stat_value: amount });
} else if specification.contains("spell hit") {
stats.push(Stat { stat_type: 23, stat_value: amount });
} else if specification.contains("crit") {
stats.push(Stat { stat_type: 8, stat_value: amount });
} else if specification.contains("hit") {
stats.push(Stat { stat_type: 7, stat_value: amount });
} else if specification.contains("ranged attack power") {
stats.push(Stat { stat_type: 25, stat_value: amount });
} else if specification.contains("attack power") {
stats.push(Stat { stat_type: 9, stat_value: amount });
} else if specification.contains("dodge") {
stats.push(Stat { stat_type: 10, stat_value: amount });
} else if specification.contains("parry") {
stats.push(Stat { stat_type: 11, stat_value: amount });
} else if specification.contains("block chance") {
stats.push(Stat { stat_type: 26, stat_value: amount });
} else if specification.contains("block") {
stats.push(Stat { stat_type: 12, stat_value: amount });
} else if specification.contains("spell damage") || specification.contains("spell power") {
stats.push(Stat { stat_type: 13, stat_value: amount });
} else if specification.contains("healing") {
stats.push(Stat { stat_type: 14, stat_value: amount });
} else if specification.contains("damage healing spells") { // Damage and healing spells
stats.push(Stat { stat_type: 13, stat_value: amount });
stats.push(Stat { stat_type: 14, stat_value: amount });
} else if specification.contains("shadow frost spell damage") {
stats.push(Stat { stat_type: 16, stat_value: amount });
stats.push(Stat { stat_type: 20, stat_value: amount });
} else if specification.contains("arcane fire spell damage") {
stats.push(Stat { stat_type: 18, stat_value: amount });
stats.push(Stat { stat_type: 19, stat_value: amount });
} else if specification.contains("holy") {
stats.push(Stat { stat_type: 15, stat_value: amount });
} else if specification.contains("frost") {
stats.push(Stat { stat_type: 16, stat_value: amount });
} else if specification.contains("nature") {
stats.push(Stat { stat_type: 17, stat_value: amount });
} else if specification.contains("fire") {
stats.push(Stat { stat_type: 18, stat_value: amount });
} else if specification.contains("arcane") {
stats.push(Stat { stat_type: 19, stat_value: amount });
} else if specification.contains("shadow") {
stats.push(Stat { stat_type: 20, stat_value: amount });
} else if specification.contains("mana regen") || specification.contains("mana every") || specification.contains("mana per") {
stats.push(Stat { stat_type: 21, stat_value: amount });
} else if specification.contains("defense rating") || specification.contains("defense") {
stats.push(Stat { stat_type: 22, stat_value: amount });
} else if specification.contains("strength") {
stats.push(Stat { stat_type: 27, stat_value: amount });
} else if specification.contains("agility") {
stats.push(Stat { stat_type: 28, stat_value: amount });
} else if specification.contains("stamina") {
stats.push(Stat { stat_type: 29, stat_value: amount });
} else if specification.contains("intellect") {
stats.push(Stat { stat_type: 30, stat_value: amount });
} else if specification.contains("spirit") {
stats.push(Stat { stat_type: 31, stat_value: amount });
} else if specification.contains("mana") {
stats.push(Stat { stat_type: 32, stat_value: amount });
} else if specification.contains("health regen") || specification.contains("health every") || specification.contains("health per") {
stats.push(Stat { stat_type: 43, stat_value: amount });
} else if specification.contains("health") || specification.contains("hp") {
stats.push(Stat { stat_type: 33, stat_value: amount });
} else if specification.contains("armor") {
stats.push(Stat { stat_type: 34, stat_value: amount });
} else if specification.contains("spell haste") {
stats.push(Stat { stat_type: 42, stat_value: amount });
} else if specification.contains("haste") {
stats.push(Stat { stat_type: 37, stat_value: amount });
} else if specification.contains("expertise") {
stats.push(Stat { stat_type: 38, stat_value: amount });
} else if specification.contains("resilience") {
stats.push(Stat { stat_type: 39, stat_value: amount });
} else if specification.contains("spell penetration") {
stats.push(Stat { stat_type: 40, stat_value: amount });
} else if specification.contains("armor penetration") {
stats.push(Stat { stat_type: 41, stat_value: amount });
} else if specification.contains("all stats") {
stats.push(Stat { stat_type: 36, stat_value: amount });
} else if specification.contains("res all") || specification.contains("resist all") || specification.contains("all resist") {
stats.push(Stat { stat_type: 35, stat_value: amount });
} else {
// println!("NO MATCH: {} / {}", specification, amount);
}
}
}

if true {
if stats.len() == 1 {
println!("UPDATE main.data_enchant SET stat_type1 = {}, stat_value1 = {}, stat_type2 = NULL, stat_value2 = NULL, stat_type3 = NULL, stat_value3 = NULL WHERE expansion_id = 1 AND id = {};", stats[0].stat_type, stats[0].stat_value, enchant_id);
} else if stats.len() == 2 {
println!("UPDATE main.data_enchant SET stat_type1 = {}, stat_value1 = {}, stat_type2 = {}, stat_value2 = {}, stat_type3 = NULL, stat_value3 = NULL WHERE expansion_id = 1 AND id = {};", stats[0].stat_type, stats[0].stat_value, stats[1].stat_type, stats[1].stat_value, enchant_id);
} else if stats.len() == 3 {
println!("UPDATE main.data_enchant SET stat_type1 = {}, stat_value1 = {}, stat_type2 = {}, stat_value2 = {}, stat_type3 = {}, stat_value3 = {} WHERE expansion_id = 1 AND id = {};", stats[0].stat_type, stats[0].stat_value, stats[1].stat_type, stats[1].stat_value, stats[2].stat_type, stats[2].stat_value, enchant_id);
} else if stats.len() > 3 {
println!("TOO MANY STATS: {} => {}", enchant_id, spell_str);
}
} else {
if !spell_str.is_empty() && stats.len() == 0 {
//println!("{}: {} => {:?}", enchant_id, spell_str, stats);
}
}
}

return;