import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from "@angular/core";
import {escapeRegExp} from "../../../../../stdlib/escapeRegExp";
import {FormFailure} from "../../../../../material/form_failure";

@Component({
    selector: "GeneralInput",
    templateUrl: "./general_input.html",
    styleUrls: ["./general_input.scss"]
})
export class GeneralInputComponent implements AfterViewInit, OnInit {
    touched: boolean = false;
    pattern: string;

    @ViewChild("generalInput", {static: false}) inputRef: ElementRef;
    @Input() type: string;
    @Input() placeholderKey: string;
    @Input() labelKey: string;
    @Input() required: boolean;
    @Input() maximum_length = 65532;
    @Input() min_spec: string;
    @Input() max_spec: string;
    @Input() name: string;
    @Input() autoFocus: boolean = false;
    @Input() htmlId: string;

    @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();
    valueData = "";
    formFailureData: FormFailure = FormFailure.empty();
    autoComplete: string = 'on';

    constructor() {
        this.updatePattern();
    }

    ngOnInit(): void {
        if (this.type === 'date') {
            this.autoComplete = 'off';
        }
    }

    ngAfterViewInit(): void {
        if (this.autoFocus) {
            this.inputRef.nativeElement.focus();
        }
    }

    onKeypress(event: any): void {
        if (event.key === 'Escape') {
            this.inputRef.nativeElement.blur();
        }
    }

    @Input()
    get value(): any {
        return this.valueData;
    }

    set value(newValue: any) {
        if (this.type === "checkbox")
            newValue = Boolean(newValue);

        if (this.valueData !== newValue) {
            this.formFailure.isInvalid = false;
            this.touch();
            this.valueChange.emit(newValue);
        }
        this.valueData = newValue;
    }

    @Input()
    get formFailure(): FormFailure {
        return this.formFailureData;
    }

    set formFailure(newValue: FormFailure) {
        if (!newValue)
            return;

        this.formFailureData = newValue;
        this.updatePattern();
        this.formFailureData.subscribe(() => this.updatePattern());
    }

    updatePattern(): void {
        if (this.formFailure.isInvalid) {
            this.pattern = "^(?!" + escapeRegExp(this.valueData) + "$).*$";
        } else {
            this.pattern = undefined;
            this.formFailure.invalidityMsg = '';
            if (!!this.inputRef)
                this.inputRef.nativeElement.setCustomValidity('');
        }
    }

    touch(): void {
        this.touched = true;
    }
}
