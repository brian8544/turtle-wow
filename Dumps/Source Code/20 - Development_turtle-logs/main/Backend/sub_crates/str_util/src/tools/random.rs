use std::iter;

use rand::{thread_rng, Rng};
use rand_distr::Alphanumeric;

pub fn alphanumeric(length: usize) -> String {
    let mut rng = thread_rng();
    iter::repeat(()).map(|()| rng.sample(Alphanumeric)).map(char::from).take(length).collect::<String>()
}
