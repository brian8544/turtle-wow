import {Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
    selector: "YesNoSwitch",
    templateUrl: "./yes_no_switch.html",
    styleUrls: ["./yes_no_switch.scss"]
})
export class YesNoSwitchComponent {

    stateData: boolean;
    @Output() stateChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Input()
    set state(newState: boolean) {
        if (this.stateData !== undefined && this.stateData !== newState)
            this.stateChange.emit(newState);
        this.stateData = newState;
    }
    get state(): boolean {
        return this.stateData;
    }

}
