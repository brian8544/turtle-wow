import {APIFailure} from "../domain_value/api_failure";
import {ObserverPattern} from "../template/class_template/observer_pattern";

export class FormFailure extends ObserverPattern {
    private isInvalidData: boolean;

    constructor(isInvalid: boolean,
                public invalidityMsg: string,
                public readonly msgArgs: any) {
        super();
        this.isInvalidData = isInvalid;
    }

    get isInvalid(): boolean {
        return this.isInvalidData;
    }

    set isInvalid(newValue: boolean) {
        if (this.isInvalidData !== newValue) {
            this.isInvalidData = newValue;
            this.notify(callback => callback.call(callback, newValue));
        } else this.isInvalidData = newValue;
    }

    static from(api_failure: APIFailure, ...statusCodes): FormFailure {
        let isInvalid = false;
        statusCodes.forEach(code => isInvalid = isInvalid || api_failure.status === code);
        if (!isInvalid)
            return FormFailure.empty();
        return new this(isInvalid, api_failure.translation, api_failure.arguments);
    }

    static empty(): FormFailure {
        return new this(false, "", {});
    }
}
