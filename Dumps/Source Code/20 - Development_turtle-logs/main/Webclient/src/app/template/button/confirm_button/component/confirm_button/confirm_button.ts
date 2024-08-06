import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from "@angular/core";

@Component({
    selector: "ConfirmButton",
    templateUrl: "./confirm_button.html",
    styleUrls: ["./confirm_button.scss"]
})
export class ConfirmButtonComponent {
    @ViewChild("confirmButton", {static: true}) inputRef: ElementRef;
    @Input() labelKey: string;
    @Input() type = "button";
    @Input() disabled = false;

    @Output() clicked: EventEmitter<boolean> = new EventEmitter();

    handleClick(): void {
        if (!this.isDisabled())
            this.clicked.emit(true);
    }

    isDisabled(): boolean {
        return this.disabled || this.inputRef.nativeElement.dataset.formValid === 'false';
    }
}
