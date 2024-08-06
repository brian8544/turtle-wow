#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct TableFilter<T> {
    pub filter: Option<T>,
    pub sorting: Option<bool>,
}

impl TableFilter<String> {
    pub fn convert_to_lowercase(&mut self) {
        self.filter = self.filter.as_ref().map(|filter| filter.to_lowercase());
    }
}

pub trait ApplyFilter<T> {
    fn apply_filter(&self, input: T) -> bool;
}

impl<T: PartialEq> ApplyFilter<T> for TableFilter<T> {
    fn apply_filter(&self, input: T) -> bool {
        self.filter.is_none() || self.filter.contains(&input)
    }
}

impl ApplyFilter<Option<String>> for TableFilter<String> {
    fn apply_filter(&self, input: Option<String>) -> bool {
        self.filter.is_none() || input.is_some() && input.as_ref().unwrap().to_lowercase().contains(&self.filter.as_ref().unwrap().to_lowercase())
    }
}

pub trait ApplyFilterTs<T> {
    fn apply_filter_ts(&self, input: T) -> bool;
}

impl ApplyFilterTs<u64> for TableFilter<u64> {
    fn apply_filter_ts(&self, input: u64) -> bool {
        self.filter.is_none() || self.filter.map(|filter_ts| input >= filter_ts && input <= filter_ts + 24 * 60 * 60).contains(&true)
    }
}

impl ApplyFilterTs<Option<u64>> for TableFilter<u64> {
    fn apply_filter_ts(&self, input: Option<u64>) -> bool {
        self.filter.is_none() || input.is_some() && self.filter.map(|filter_ts| input.unwrap() >= filter_ts && input.unwrap() <= filter_ts + 24 * 60 * 60).contains(&true)
    }
}
