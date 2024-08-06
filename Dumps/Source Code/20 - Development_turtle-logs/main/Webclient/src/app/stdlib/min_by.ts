export function min_by(input: Array<any>, lambda): any {
    let prev_result = input[0];
    for (let i=1; i<input.length; ++i) {
        if (lambda(prev_result) > lambda(input[i])) {
            prev_result = input[i];
        }
    }
    return prev_result;
}
