#[cfg(test)]
mod tests {
    #[test]
    fn time_test() {
        let num_days = 42;
        let now = crate::get_ts_from_now_in_secs(0);
        let then = crate::get_ts_from_now_in_secs(num_days);
        let max_difference = 42 * 24 * 60 * 60;

        assert!(then >= now);
        assert!(then - now <= max_difference + 1); // One second tolerance
    }
}
