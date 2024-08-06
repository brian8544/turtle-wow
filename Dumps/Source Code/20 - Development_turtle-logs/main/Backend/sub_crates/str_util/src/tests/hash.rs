use crate::sha3;

#[test]
fn hash() {
    let sample = ["Test", "123"];
    let result = sha3::hash(&sample);
    assert_eq!(result, "68644f3dd172089ae9a650e582ae4759df2ed943291b70729abbc96bca2521ac34f2fad8971c50210e173bd506f3c8e4260f932fd99c3b59c1884fd816cb24ee");
}
