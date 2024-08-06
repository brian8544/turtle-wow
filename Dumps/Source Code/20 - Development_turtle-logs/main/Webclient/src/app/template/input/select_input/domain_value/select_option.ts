import {Observable} from "rxjs";

export interface SelectOption {
    value: number | string;
    label_key: string | Observable<string>;
}
