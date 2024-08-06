import {iterable_filterMap, iterable_map} from "./iterable_higher_order";

class Bucket {
    private content: Map<number, Array<[number, number]>> = new Map();

    constructor(
        public start: number,
        public end: number
    ) {
    }

    insert(value_index: number, start: number, end: number): void {
        if (!this.content.has(value_index))
            this.content.set(value_index, []);
        this.content.get(value_index).push([start, end]); // TODO: Interval merging?
    }

    find(timestamp: number): Array<[number, number, number]> {
        // @ts-ignore
        return iterable_filterMap(this.content.entries(),
            ([index, intervals]) => {
                const result = intervals.find(([start, end]) => start <= timestamp && end >= timestamp);
                if (result !== undefined)
                    return [index, ...result];
                return undefined;
            });
    }

    find_within_range(start: number, end: number): Array<[number, number, number]> {
        if (start <= this.start && end >= this.end) {
            // @ts-ignore
            return iterable_map(this.content.entries(),
                ([value_index, interval]) => [value_index, ...interval]);
        } else if (this.start <= start && end >= this.end) {
            // @ts-ignore
            return iterable_filterMap(this.content.entries(),
                ([value_index, intervals]) => {
                    const result = intervals.find(([i_start, i_end]) => i_end >= start);
                    if (result !== undefined)
                        return [value_index, ...result];
                    return undefined;
                });
        } else if (start <= this.start && this.end >= end) {
            // @ts-ignore
            return iterable_filterMap(this.content.entries(),
                ([value_index, intervals]) => {
                    const result = intervals.find(([i_start, i_end]) => i_start <= end);
                    if (result !== undefined)
                        return [value_index, ...result];
                    return undefined;
                });
        }
        // @ts-ignore
        return iterable_filterMap(this.content.entries(),
            ([value_index, intervals]) => {
                const result = intervals.find(([i_start, i_end]) => i_start <= end && i_end >= start);
                if (result !== undefined)
                    return [value_index, ...result];
                return undefined;
            });
    }
}

export class IntervalBucket {
    private readonly buckets: Array<Bucket>;

    constructor(
        private start: number,
        private end: number,
        private step_size: number
    ) {
        const num_buckets: number = Math.ceil((end - start) / step_size);
        this.buckets = Array(num_buckets);
        for (let i = 0; i < num_buckets; ++i)
            this.buckets[i] = new Bucket(start + i * step_size, start + (i + 1) * step_size);

    }

    insert(start: number, end: number, value_index: number): void {
        start = Math.max(this.start, start);
        end = Math.min(this.end, end);
        const index_start = this.get_bucket_index(start);
        const index_end = this.get_bucket_index(end);
        for (let bucket_index = index_start; bucket_index <= index_end; ++bucket_index) {
            const bucket_start = this.buckets[bucket_index].start;
            const bucket_end = this.buckets[bucket_index].end;
            this.buckets[bucket_index].insert(value_index, Math.max(start, bucket_start), Math.min(end, bucket_end));
        }
    }

    find(timestamp: number): Array<[number, number, number]> {
        if (!(timestamp >= this.start && timestamp <= this.end))
            return [];
        return this.buckets[this.get_bucket_index(timestamp)].find(timestamp);
    }

    find_within_range(start: number, end: number): Array<[number, number, number]> {
        start = Math.max(this.start, start);
        end = Math.min(this.end, end);
        const index_start = this.get_bucket_index(start);
        const index_end = this.get_bucket_index(end);
        const result = new Map();
        for (let bucket_index = index_start; bucket_index <= index_end; ++bucket_index) {
            for (const [value_index, b_start, b_end] of this.buckets[bucket_index].find_within_range(start, end)) {
                if (result.has(value_index)) {
                    const [r_start, r_end] = result.get(value_index);
                    result.set(value_index, [
                        Math.min(r_start, b_start),
                        Math.max(r_end, b_end)
                    ]);
                } else {
                    result.set(value_index, [b_start, b_end]);
                }
            }
        }
        // @ts-ignore
        return [...result.entries()].map(([value_index, interval]) => [value_index, ...interval]);
    }

    private get_bucket_index(timestamp: number): number {
        return Math.floor((timestamp - this.start) / this.step_size);
    }
}

