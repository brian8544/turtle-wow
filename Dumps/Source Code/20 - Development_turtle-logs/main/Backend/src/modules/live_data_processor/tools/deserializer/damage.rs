use crate::modules::live_data_processor::domain_value::{school_mask_to_u8, Mitigation, SpellComponent};
use crate::modules::live_data_processor::tools::LiveDataDeserializer;

impl LiveDataDeserializer for SpellComponent {
    fn deserialize(&self) -> String {
        format!("[{},{},{}]", self.amount, school_mask_to_u8(self.school_mask.clone()), self.mitigation.deserialize())
    }
}

impl LiveDataDeserializer for Vec<SpellComponent> {
    fn deserialize(&self) -> String {
        format!("[{}]", self.iter().map(|component| component.deserialize()).collect::<Vec<String>>().join(","))
    }
}

impl LiveDataDeserializer for Vec<Mitigation> {
    fn deserialize(&self) -> String {
        let mut absorb = 0;
        let mut resist = 0;
        let mut block = 0;
        for mitigation in self.iter() {
            match mitigation {
                Mitigation::Absorb(amount) => absorb = *amount,
                Mitigation::Resist(amount) => resist = *amount,
                Mitigation::Block(amount) => block = *amount,
                _ => {},
            };
        }
        format!("{},{},{}", absorb, resist, block)
    }
}
