#[derive(Clone, Debug, Deserialize)]
pub struct PatreonEmpty {
}

#[derive(Clone, Debug, Deserialize)]
pub struct PatreonMemberAttributes {
    pub email: String
}

#[derive(Clone, Debug, Deserialize)]
pub struct PatreonEntitledTiers2 {
    pub id: String,
    #[serde(rename = "type")]
    pub tier_type: String
}

#[derive(Clone, Debug, Deserialize)]
pub struct PatreonEntitledTiers1 {
    pub data: Vec<PatreonEntitledTiers2>
}

#[derive(Clone, Debug, Deserialize)]
pub struct PatreonRelationship {
    pub currently_entitled_tiers: PatreonEntitledTiers1,
}

#[derive(Clone, Debug, Deserialize)]
pub struct PatreonMember {
    pub attributes: PatreonMemberAttributes,
    pub id: String,
    #[serde(rename = "type")]
    pub mem_type: String,
    pub relationships: PatreonRelationship
}

#[derive(Clone, Debug, Deserialize)]
pub struct PatreonIncluded {
    pub attributes: PatreonEmpty,
    pub id: String,
    #[serde(rename = "type")]
    pub inc_type: String
}

#[derive(Clone, Debug, Deserialize)]
pub struct PatreonPagination {
    pub total: u32
}

#[derive(Clone, Debug, Deserialize)]
pub struct PatreonMeta {
    pub pagination: PatreonPagination
}

#[derive(Clone, Debug, Deserialize)]
pub struct PatreonResponse {
    pub data: Vec<PatreonMember>,
    pub included: Vec<PatreonIncluded>,
    pub meta: PatreonMeta
}