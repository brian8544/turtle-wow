use crate::modules::data::tools::SpellDescription;
use crate::modules::data::{Data, Stat};
use crate::tests::TestContainer;

#[test]
fn test_parse_stats_none() {
    let data = Data::default();

    // Act
    let result = data.parse_stats(1, 0);

    // Assert
    assert_eq!(result, vec![]);
}

#[test]
fn test_parse_stats_magical_spell() {
    let container = TestContainer::new(true);
    let (mut conn, _dns, _node) = container.run();

    // Arrange
    let data = Data::default().init(&mut conn);

    // Act
    let result = data.parse_stats(1, 9346);

    // Assert
    assert_eq!(result, vec![Stat { stat_type: 13, stat_value: 18 }, Stat { stat_type: 14, stat_value: 18 }]);
}
