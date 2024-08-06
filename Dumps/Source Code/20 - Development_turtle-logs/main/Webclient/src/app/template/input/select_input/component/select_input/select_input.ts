import {AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild} from "@angular/core";
import {SelectOption} from "./../../domain_value/select_option";

@Component({
    selector: "SelectInput",
    templateUrl: "./select_input.html",
    styleUrls: ["./select_input.scss"]
})
export class SelectInputComponent implements AfterViewInit {

    @ViewChild("selectInput", {static: true}) inputRef: ElementRef;
    @Input() themed: boolean = false;
    @Input() options: Array<SelectOption>;
    @Input() autoFocus: boolean = false;

    @Output() valueChange: EventEmitter<number | string> = new EventEmitter<number | string>();
    valueData: number | string;
    @Input()
    get value(): number | string {
        return this.valueData;
    }

    set value(selectedOption: number | string) {
        if (this.valueData !== selectedOption) {
            this.valueChange.emit(selectedOption);
        }
        this.valueData = selectedOption;
    }

    ngAfterViewInit(): void {
        if (this.autoFocus) {
            this.inputRef.nativeElement.focus();
        }
    }

}
