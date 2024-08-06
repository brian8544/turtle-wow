use std::collections::HashMap;

pub trait UniqueBucketId {
    fn get_unique_bucket_id(&self) -> u64;
}

#[derive(Debug)]
struct Bucket {
    pub start: i64,
    pub end: i64,
    content: HashMap<u64, Vec<(i64, i64)>>,
}

impl Bucket {
    pub fn new(start: i64, end: i64) -> Self {
        Bucket {
            start,
            end,
            content: HashMap::new(),
        }
    }

    pub fn insert(&mut self, value_index: u64, start: i64, end: i64) {
        let content = self.content.entry(value_index).or_insert_with(Vec::new);
        content.push((start, end));
    }

    pub fn find(&self, ts: i64) -> Vec<(u64, i64, i64)> {
        self.content.iter().filter_map(|(unique_id, intervals)| intervals.iter()
            .find(|(start, end)| *start <= ts && *end >= ts).map(|(start, end)| (*unique_id, *start, *end))).collect()
    }

    pub fn find_within_range(&self, start: i64, end: i64) -> Vec<(u64, i64, i64)> {
        if start <= self.start && end >= self.end {
            self.content.keys().map(|key| (*key, start, end)).collect()
        } else if self.start <= start && end >= self.end {
            self.content.iter().filter_map(|(unique_id, intervals)| intervals.iter()
                .find(|(_, end)| *end >= start).map(|(start, end)| (*unique_id, *start, *end))).collect()
        } else if start <= self.start && self.end >= end {
            self.content.iter().filter_map(|(unique_id, intervals)| intervals.iter()
                .find(|(start, _)| *start <= end).map(|(start, end)| (*unique_id, *start, *end))).collect()
        } else {
            self.content.iter().filter_map(|(unique_id, intervals)| intervals.iter()
                .find(|(i_start, i_end)| *i_start <= end && *i_end >= start).map(|(start, end)| (*unique_id, *start, *end))).collect()
        }
    }
}

pub struct IntervalBucket<T: UniqueBucketId> {
    start: i64,
    end: i64,
    step_size: i64,
    pub value_map: HashMap<u64, T>,
    buckets: Vec<Bucket>,
}

impl<T: UniqueBucketId> IntervalBucket<T> {
    pub fn new(start: i64, end: i64, step_size: i64) -> Self {
        let num_buckets = (((end - start) as f64) / (step_size as f64)).ceil() as usize;
        let mut buckets = Vec::with_capacity(num_buckets);
        for i in 0..num_buckets {
            buckets.push(Bucket::new(start + (i as i64) * step_size, start + ((i + 1) as i64) * step_size));
        }
        IntervalBucket {
            start,
            end,
            step_size,
            buckets,
            value_map: HashMap::default(),
        }
    }

    pub fn insert(&mut self, start: i64, end: i64, value: T) {
        let start = start.max(self.start);
        let end = end.min(self.end);
        let value_index = self.value_map.entry(value.get_unique_bucket_id()).or_insert(value).get_unique_bucket_id();
        let bucket_index_start = self.get_bucket_index(start);
        let bucket_index_end = self.get_bucket_index(end);
        for bucket_index in bucket_index_start..(bucket_index_end + 1) {
            let bucket_start = self.buckets[bucket_index].start;
            let bucket_end = self.buckets[bucket_index].end;
            self.buckets[bucket_index].insert(value_index, start.max(bucket_start), end.min(bucket_end))
        }
    }

    pub fn find_unique_ids(&self, ts: i64) -> Vec<(u64, i64, i64)> {
        if !(ts >= self.start && ts <= self.end) {
            return vec![];
        }
        let bucket_index = self.get_bucket_index(ts);
        self.buckets[bucket_index].find(ts)
    }

    pub fn find_unique_ids_within_range(&self, start: i64, end: i64) -> Vec<(u64, i64, i64)> {
        let start = start.max(self.start);
        let end = end.min(self.end);
        let bucket_index_start = self.get_bucket_index(start);
        let bucket_index_end = self.get_bucket_index(end);
        let mut result = HashMap::new();
        for bucket_index in bucket_index_start..(bucket_index_end + 1) {
            for (unique_id, start, end) in self.buckets[bucket_index].find_within_range(start, end) {
                let entry = result.entry(unique_id).or_insert((start, end));
                entry.0 = entry.0.min(start);
                entry.1 = entry.1.max(end);
            }
        }
        result.iter().fold(Vec::with_capacity(result.len()), |mut acc, (unique_id, (start, end))| {
            acc.push((*unique_id, *start, *end));
            acc
        })
    }

    fn get_bucket_index(&self, ts: i64) -> usize {
        return (((ts - self.start) as f64) / (self.step_size as f64)).floor() as usize;
    }
}