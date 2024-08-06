
export function enumerate(arr: Array<any>): Array<any> {
    let count = 0;
    return arr.map(item => [count++, item]);
}
