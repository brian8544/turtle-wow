use crate::util::database::*;

use crate::modules::armory::{
    domain_value::CharacterGear,
    dto::{ArmoryFailure, CharacterGearDto},
    tools::{CreateCharacterItem, GetCharacterGear},
    Armory,
};
use crate::params;

pub trait CreateCharacterGear {
    fn create_character_gear(&self, db_main: &mut (impl Execute + Select), character_gear: CharacterGearDto) -> Result<CharacterGear, ArmoryFailure>;
}

impl CreateCharacterGear for Armory {
    fn create_character_gear(&self, db_main: &mut (impl Execute + Select), character_gear: CharacterGearDto) -> Result<CharacterGear, ArmoryFailure> {
        // Check if it already exists
        let existing_gear = self.get_character_gear_by_value(db_main, character_gear.clone());
        if existing_gear.is_ok() {
            return existing_gear;
        }

        // Note: We do this, because the process must fail if one of its components fails
        let mut head = None;
        if character_gear.head.is_some() {
            let item_res = self.create_character_item(db_main, character_gear.head.clone().unwrap());
            if item_res.is_err() {
                return Err(item_res.err().unwrap());
            }
            head = item_res.ok().map(|item| item.id)
        }

        let mut neck = None;
        if character_gear.neck.is_some() {
            let item_res = self.create_character_item(db_main, character_gear.neck.clone().unwrap());
            if item_res.is_err() {
                return Err(item_res.err().unwrap());
            }
            neck = item_res.ok().map(|item| item.id)
        }

        let mut shoulder = None;
        if character_gear.shoulder.is_some() {
            let item_res = self.create_character_item(db_main, character_gear.shoulder.clone().unwrap());
            if item_res.is_err() {
                return Err(item_res.err().unwrap());
            }
            shoulder = item_res.ok().map(|item| item.id)
        }

        let mut back = None;
        if character_gear.back.is_some() {
            let item_res = self.create_character_item(db_main, character_gear.back.clone().unwrap());
            if item_res.is_err() {
                return Err(item_res.err().unwrap());
            }
            back = item_res.ok().map(|item| item.id)
        }

        let mut chest = None;
        if character_gear.chest.is_some() {
            let item_res = self.create_character_item(db_main, character_gear.chest.clone().unwrap());
            if item_res.is_err() {
                return Err(item_res.err().unwrap());
            }
            chest = item_res.ok().map(|item| item.id)
        }

        let mut shirt = None;
        if character_gear.shirt.is_some() {
            let item_res = self.create_character_item(db_main, character_gear.shirt.clone().unwrap());
            if item_res.is_err() {
                return Err(item_res.err().unwrap());
            }
            shirt = item_res.ok().map(|item| item.id)
        }

        let mut tabard = None;
        if character_gear.tabard.is_some() {
            let item_res = self.create_character_item(db_main, character_gear.tabard.clone().unwrap());
            if item_res.is_err() {
                return Err(item_res.err().unwrap());
            }
            tabard = item_res.ok().map(|item| item.id)
        }

        let mut wrist = None;
        if character_gear.wrist.is_some() {
            let item_res = self.create_character_item(db_main, character_gear.wrist.clone().unwrap());
            if item_res.is_err() {
                return Err(item_res.err().unwrap());
            }
            wrist = item_res.ok().map(|item| item.id)
        }

        let mut main_hand = None;
        if character_gear.main_hand.is_some() {
            let item_res = self.create_character_item(db_main, character_gear.main_hand.clone().unwrap());
            if item_res.is_err() {
                return Err(item_res.err().unwrap());
            }
            main_hand = item_res.ok().map(|item| item.id)
        }

        let mut off_hand = None;
        if character_gear.off_hand.is_some() {
            let item_res = self.create_character_item(db_main, character_gear.off_hand.clone().unwrap());
            if item_res.is_err() {
                return Err(item_res.err().unwrap());
            }
            off_hand = item_res.ok().map(|item| item.id)
        }

        let mut ternary_hand = None;
        if character_gear.ternary_hand.is_some() {
            let item_res = self.create_character_item(db_main, character_gear.ternary_hand.clone().unwrap());
            if item_res.is_err() {
                return Err(item_res.err().unwrap());
            }
            ternary_hand = item_res.ok().map(|item| item.id)
        }

        let mut glove = None;
        if character_gear.glove.is_some() {
            let item_res = self.create_character_item(db_main, character_gear.glove.clone().unwrap());
            if item_res.is_err() {
                return Err(item_res.err().unwrap());
            }
            glove = item_res.ok().map(|item| item.id)
        }

        let mut belt = None;
        if character_gear.belt.is_some() {
            let item_res = self.create_character_item(db_main, character_gear.belt.clone().unwrap());
            if item_res.is_err() {
                return Err(item_res.err().unwrap());
            }
            belt = item_res.ok().map(|item| item.id)
        }

        let mut leg = None;
        if character_gear.leg.is_some() {
            let item_res = self.create_character_item(db_main, character_gear.leg.clone().unwrap());
            if item_res.is_err() {
                return Err(item_res.err().unwrap());
            }
            leg = item_res.ok().map(|item| item.id)
        }

        let mut boot = None;
        if character_gear.boot.is_some() {
            let item_res = self.create_character_item(db_main, character_gear.boot.clone().unwrap());
            if item_res.is_err() {
                return Err(item_res.err().unwrap());
            }
            boot = item_res.ok().map(|item| item.id)
        }

        let mut ring1 = None;
        if character_gear.ring1.is_some() {
            let item_res = self.create_character_item(db_main, character_gear.ring1.clone().unwrap());
            if item_res.is_err() {
                return Err(item_res.err().unwrap());
            }
            ring1 = item_res.ok().map(|item| item.id)
        }

        let mut ring2 = None;
        if character_gear.ring2.is_some() {
            let item_res = self.create_character_item(db_main, character_gear.ring2.clone().unwrap());
            if item_res.is_err() {
                return Err(item_res.err().unwrap());
            }
            ring2 = item_res.ok().map(|item| item.id)
        }

        let mut trinket1 = None;
        if character_gear.trinket1.is_some() {
            let item_res = self.create_character_item(db_main, character_gear.trinket1.clone().unwrap());
            if item_res.is_err() {
                return Err(item_res.err().unwrap());
            }
            trinket1 = item_res.ok().map(|item| item.id)
        }

        let mut trinket2 = None;
        if character_gear.trinket2.is_some() {
            let item_res = self.create_character_item(db_main, character_gear.trinket2.clone().unwrap());
            if item_res.is_err() {
                return Err(item_res.err().unwrap());
            }
            trinket2 = item_res.ok().map(|item| item.id)
        }

        // Note: This is extremely inefficient
        let params = params!(
          "head" => head,
          "neck" => neck,
          "shoulder" => shoulder,
          "back" => back,
          "chest" => chest,
          "shirt" => shirt,
          "tabard" => tabard,
          "wrist" => wrist,
          "main_hand" => main_hand,
          "off_hand" => off_hand,
          "ternary_hand" => ternary_hand,
          "glove" => glove,
          "belt" => belt,
          "leg" => leg,
          "boot" => boot,
          "ring1" => ring1,
          "ring2" => ring2,
          "trinket1" => trinket1,
          "trinket2" => trinket2
        );

        // It may fail due to the unique constraint if a race condition occurs
        db_main.execute_wparams(
            "INSERT INTO armory_gear (`head`, `neck`, `shoulder`, `back`, `chest`, `shirt`, `tabard`, `wrist`, `main_hand`, `off_hand`, `ternary_hand`, `glove`, `belt`, `leg`, `boot`, `ring1`, `ring2`, `trinket1`, `trinket2`) VALUES (:head, :neck, \
             :shoulder, :back, :chest, :shirt, :tabard, :wrist, :main_hand, :off_hand, :ternary_hand, :glove, :belt, :leg, :boot, :ring1, :ring2, :trinket1, :trinket2)",
            params,
        );
        if let Ok(char_gear) = self.get_character_gear_by_value(db_main, character_gear) {
            return Ok(char_gear);
        }
        Err(ArmoryFailure::Database("create_character_gear".to_owned()))
    }
}
