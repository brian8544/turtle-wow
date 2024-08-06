
function iterable_some<T>(iterable: Iterator<T>, predicate: (T) => boolean): boolean {
    let result = iterable.next();
    while (!result.done) {
        if (predicate(result.value))
            return true;
        result = iterable.next();
    }
    return false;
}

function iterable_filterMap<T, U>(iterable: Iterator<T>, predicate: (T) => U | undefined): Array<U> {
    const result = [];
    let element = iterable.next();
    while (!element.done) {
        const pred_res = predicate(element.value);
        if (pred_res !== undefined)
            result.push(pred_res);
        element = iterable.next();
    }
    return result;
}

function iterable_map<T, U>(iterable: Iterator<T>, predicate: (T) => U): Array<U> {
    const result = [];
    let element = iterable.next();
    while (!element.done) {
        result.push(predicate(element.value));
        element = iterable.next();
    }
    return result;
}

function iterable_filter<T, U>(iterable: Iterator<T>, predicate: (T) => boolean): Array<U> {
    const result = [];
    let element = iterable.next();
    while (!element.done) {
        if (predicate(element.value))
            result.push(element.value);
        element = iterable.next();
    }
    return result;
}


export {iterable_some, iterable_filterMap, iterable_map, iterable_filter};
