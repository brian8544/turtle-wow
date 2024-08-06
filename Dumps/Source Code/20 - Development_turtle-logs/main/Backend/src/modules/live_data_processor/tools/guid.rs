pub trait GUID {
    fn get_high(&self) -> u16;
    fn is_player(&self) -> bool;
    fn is_pet(&self) -> bool;
    fn is_creature(&self) -> bool;
    fn is_vehicle(&self) -> bool;
    fn is_any_creature(&self) -> bool;
    fn is_unit(&self) -> bool;
    fn get_entry(&self) -> Option<u32>;
}

impl GUID for u64 {
    fn get_high(&self) -> u16 {
        self.rotate_right(48) as u16
    }

    fn is_player(&self) -> bool {
        self.get_high() & 0x00F0 == 0x0000
    }

    fn is_pet(&self) -> bool {
        self.get_high() & 0x00F0 == 0x0040
    }

    fn is_creature(&self) -> bool {
        self.get_high() & 0x00F0 == 0x0030
    }

    fn is_vehicle(&self) -> bool {
        self.get_high() & 0x00F0 == 0x0050
    }

    fn is_any_creature(&self) -> bool {
        self.is_creature() || self.is_pet() || self.is_vehicle()
    }

    fn is_unit(&self) -> bool {
        self.is_any_creature() || self.is_player()
    }

    fn get_entry(&self) -> Option<u32> {
        if self.is_any_creature() {
            return Some((self.rotate_right(24) & 0x0000000000FFFFFF) as u32);
        }
        None
    }
}
