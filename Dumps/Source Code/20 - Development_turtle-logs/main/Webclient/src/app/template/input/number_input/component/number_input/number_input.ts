import {Component, EventEmitter, Input, Output} from "@angular/core";
import {FormFailure} from "../../../../../material/form_failure";

@Component({
    selector: "NumberInput",
    templateUrl: "./number_input.html",
    styleUrls: []
})
export class NumberInputComponent {
    @Input() required: boolean;
    @Input() placeholderKey: string;
    @Input() labelKey: string;
    @Input() name: string;
    @Input() formFailure: FormFailure;
    @Input() min_number: number;
    @Input() max_number: number;
    @Input() autoFocus: boolean = false;

    @Output() valueChange: EventEmitter<number> = new EventEmitter<number>();
    valueData: number;

    @Input()
    get value(): number {
        return this.valueData;
    }

    set value(newValue: number) {
        if (this.valueData !== newValue)
            this.valueChange.emit(newValue);
        this.valueData = newValue;
    }

    parseNumber(changedValue: string): void {
        this.value = Number(changedValue);
    }
}
