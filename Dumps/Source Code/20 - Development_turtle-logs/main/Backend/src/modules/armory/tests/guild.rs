use crate::modules::armory::{
    dto::GuildDto,
    tools::{CreateGuild, GetGuild, UpdateGuild},
    Armory,
};
use crate::tests::TestContainer;

#[test]
fn guild() {
    let container = TestContainer::new(false);
    let (mut conn, _dns, _node) = container.run();

    let armory = Armory::default();
    let guild_dto = GuildDto {
        server_uid: 23423214,
        name: "WeirdGuildName".to_owned(),
    };

    let guild_res = armory.create_guild(&mut conn, 1, guild_dto.clone());
    assert!(guild_res.is_ok());

    let guild = guild_res.unwrap();
    assert!(guild.compare_by_value(&guild_dto));

    let guild_res2 = armory.get_guild(guild.id);
    assert!(guild_res2.is_some());

    let guild2 = guild_res2.unwrap();
    assert!(guild2.deep_eq(&guild));

    // update the guild
    let new_guild_name = "Test123".to_string();
    let update_res = armory.update_guild_name(&mut conn, 1, guild_dto.server_uid, new_guild_name.clone());
    assert!(update_res.is_ok());

    let guild_res3 = armory.get_guild(guild.id);
    assert!(guild_res3.is_some());

    let guild3 = guild_res3.unwrap();
    assert_eq!(guild3.server_uid, guild_dto.server_uid);
    assert_ne!(guild3.name, guild_dto.name);
    assert_eq!(guild3.name, new_guild_name);
}
