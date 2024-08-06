import {BehaviorSubject} from "rxjs";

function init_behavior_subject<T>(behavior_subject: BehaviorSubject<T>, init_value: T, load_function: any): BehaviorSubject<T> {
    if (behavior_subject)
        return behavior_subject;
    behavior_subject = new BehaviorSubject<T>(init_value);
    load_function(behavior_subject);
    return behavior_subject;
}

export { init_behavior_subject };
