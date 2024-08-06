use super::helper::get_character_facial;
use crate::modules::armory::{
    tools::{CreateCharacterFacial, GetCharacterFacial},
    Armory,
};
use crate::tests::TestContainer;

#[test]
fn character_facial() {
    let container = TestContainer::new(false);
    let (mut conn, _dns, _node) = container.run();

    let armory = Armory::default();
    let character_facial_dto = get_character_facial();

    let character_facial_res = armory.create_character_facial(&mut conn, character_facial_dto.clone());
    assert!(character_facial_res.is_ok());

    let character_facial = character_facial_res.unwrap();
    assert!(character_facial.compare_by_value(&character_facial_dto));

    let character_facial2_res = armory.get_character_facial(&mut conn, character_facial.id);
    assert!(character_facial2_res.is_ok());

    let character_facial2 = character_facial2_res.unwrap();
    assert!(character_facial2.deep_eq(&character_facial));
}
