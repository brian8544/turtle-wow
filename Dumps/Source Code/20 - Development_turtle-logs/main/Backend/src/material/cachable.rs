use std::cell::Cell;

pub struct Cachable<T> {
    last_access: Cell<u64>,
    last_updated: u64,
    cached: T,
}

impl<T: Clone> Cachable<T> {
    pub fn new(cached: T) -> Self {
        let now = time_util::now();
        Cachable {
            last_access: Cell::new(now),
            last_updated: now,
            cached,
        }
    }

    pub fn get_cached(&self) -> T {
        self.last_access.set(time_util::now());
        self.cached.clone()
    }

    pub fn get_last_access(&self) -> u64 {
        self.last_access.get()
    }

    pub fn get_last_updated(&self) -> u64 {
        self.last_updated
    }
}

unsafe impl<T> Send for Cachable<T> {}
unsafe impl<T> Sync for Cachable<T> {}
