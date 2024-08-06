import {Component, EventEmitter, Input, Output} from "@angular/core";
import {FormFailure} from "../../../../../material/form_failure";
import {DateService} from "../../../../../service/date";

@Component({
    selector: "DateInput",
    templateUrl: "./date_input.html"
})
export class DateInputComponent {
    @Input() required: boolean;
    @Input() placeholderKey: string;
    @Input() labelKey: string;
    @Input() name: string;
    @Input() formFailure: FormFailure;
    @Input() min_date: Date;
    @Input() max_date: Date;
    @Input() autoFocus: boolean = false;

    @Output() valueChange: EventEmitter<Date> = new EventEmitter<Date>();
    valueData: Date;

    constructor(
        private dateService: DateService
    ) {}

    @Input()
    get value(): Date {
        return this.valueData;
    }

    set value(newValue: Date) {
        if ((newValue && (!this.valueData || this.valueData.getTime() !== newValue.getTime())) || (this.valueData && !newValue))
            this.valueChange.emit(newValue);
        this.valueData = newValue;
    }

    parseDate(changedValue: string): void {
        this.value = new Date(changedValue);
    }

    passDate(dateVal: Date): string {
        if (!dateVal || !dateVal.getTime || !dateVal.getTime())
            return '';
        return this.dateService.toRPLLDateInputDate(dateVal);
    }
}
