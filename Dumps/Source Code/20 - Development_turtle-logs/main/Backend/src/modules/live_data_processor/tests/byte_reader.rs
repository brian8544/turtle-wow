use crate::modules::live_data_processor::tools::byte_reader;

#[test]
fn read_u16() {
    // Arrange
    let input = vec![16, 0];

    // Act
    let number = byte_reader::read_u16(&input);

    // Assert
    assert!(number.is_ok());
    assert_eq!(number.unwrap(), 16);
}

#[test]
fn read_u32() {
    // Arrange
    let input = vec![0, 1, 0, 0];

    // Act
    let number = byte_reader::read_u32(&input);

    // Assert
    assert!(number.is_ok());
    assert_eq!(number.unwrap(), 256);
}

#[test]
fn read_u64() {
    // Arrange
    let input = vec![0, 0, 1, 0, 0, 0, 0, 0];

    // Act
    let number = byte_reader::read_u64(&input);

    // Assert
    assert!(number.is_ok());
    assert_eq!(number.unwrap(), 65536);
}

#[test]
fn read_i16() {
    // Arrange
    let input = vec![255, 255];

    // Act
    let number = byte_reader::read_i16(&input);

    // Assert
    assert!(number.is_ok());
    assert_eq!(number.unwrap(), -1);
}

#[test]
fn read_i32() {
    // Arrange
    let input = vec![255, 255, 0, 0];

    // Act
    let number = byte_reader::read_i32(&input);

    // Assert
    assert!(number.is_ok());
    assert_eq!(number.unwrap(), 65535);
}

#[test]
fn read_i64() {
    // Arrange
    let input = vec![255, 255, 0, 0, 0, 0, 0, 0];

    // Act
    let number = byte_reader::read_i64(&input);

    // Assert
    assert!(number.is_ok());
    assert_eq!(number.unwrap(), 65535);
}
