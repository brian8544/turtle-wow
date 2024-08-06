use crate::modules::tooltip::{
    domain_value::{ItemSet, Stat, WeaponStat},
    material::Socket,
};

#[derive(Debug, Clone, Serialize, JsonSchema)]
pub struct ItemTooltip {
    pub item_id: u32,
    pub name: String,
    pub icon: String,
    pub quality: u8,
    pub bonding: Option<String>,
    pub inventory_type: Option<String>,
    pub sheath_type: Option<String>,
    pub sub_class: String,
    pub armor: Option<u16>,
    pub stats: Option<Vec<Stat>>,
    pub durability: Option<u16>,
    pub item_level: Option<u16>,
    pub required_level: Option<u8>,
    pub item_effects: Option<Vec<String>>,
    pub item_set: Option<ItemSet>,
    pub socket: Option<Socket>,
    pub enchant: Option<String>,
    pub weapon_stat: Option<WeaponStat>,
}
