export function group_by(xs, key) {
    return xs.reduce((rv, x) => {
        const key_res = key(x);
        (rv[key_res] = rv[key_res] || []).push(x);
        return rv;
    }, {});
}
