extern crate proptest;
use self::proptest::prelude::*;
use crate::strformat;

proptest! {
  /// This test is supplied with three random inputs:
  ///
  /// 1. Size of the generated arguments, in interval `[0,32]`
  /// 2. Permutations of strings for generated arguments, `size = 32`
  /// 3. Strings to pick from, `size = 32`
  ///
  /// The idea is to generate a format string with random indices, e.g. `"{2} {4} {0} {0}"`. The function `strformat::fmt()` then inserts the corresponding values from `strings`. Consider a `strings` array of `["A", "B", "C", "D", "E", "F"]` we get a format string of `"C E A A"`.
  #[test]
  #[ignore]
  fn test_arguments(size in 0usize..33usize, permutations in prop::array::uniform32(0usize..32usize), strings in prop::array::uniform32("\\PC*")) {
    let format = (0..size)
      .map(|i| format!("{{{}}}", permutations[i]))
      .collect::<Vec<_>>()
      .join(" ");
    let arguments = strings
      .iter()
      .map(|item| &item[..])
      .collect::<Vec<_>>();
    let expected = (0..size)
      .map(|i| &strings[permutations[i]][..])
      .collect::<Vec<_>>()
      .join(" ");
    assert_eq!(strformat::fmt(format, &arguments), expected);
  }
}

#[test]
fn fmt() {
    let fmt = "{2} {1} {3} {0}".to_string();
    let input = ["Test", "is", "This", "a"];
    let result = "This is a Test";
    assert_eq!(strformat::fmt(fmt, &input), result);
}

#[test]
fn fmt_empty_arguments() {
    let fmt = "{2} {1} {3} {0}".to_string();
    let input = [];
    assert_eq!(strformat::fmt(fmt.clone(), &input), fmt);
}
