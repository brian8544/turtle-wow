#[derive(Debug, PartialEq, Copy, Clone)]
#[repr(u8)]
pub enum InventoryType {
    Ammo = 0,
    Head = 1,
    Neck = 2,
    Shoulder = 3,
    Shirt = 4,
    Chest = 5,
    Waist = 6,
    Legs = 7,
    Feet = 8,
    Wrist = 9,
    Hands = 10,
    Finger1 = 11,
    Finger2 = 12,
    Trinket1 = 13,
    Trinket2 = 14,
    Back = 15,
    MainHand = 16,
    OffHand = 17,
    Ranged = 18,
    Tabard = 19,
    FirstBag = 20,
    SecondBag = 21,
    ThirdBag = 22,
    FourthBag = 23,
}

impl InventoryType {
    pub fn from_u8(number: u8) -> Self {
        unsafe { ::std::mem::transmute(number) }
    }
}
