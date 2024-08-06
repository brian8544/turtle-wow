use crate::modules::data::language::english;
use language::material::Dictionary;

pub trait Init {
    fn init(&self);
}

impl Init for Dictionary {
    fn init(&self) {
        english::init(self);
    }
}
