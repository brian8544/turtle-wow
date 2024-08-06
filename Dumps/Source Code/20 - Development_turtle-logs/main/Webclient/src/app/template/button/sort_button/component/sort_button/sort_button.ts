import {Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
    selector: "SortButton",
    templateUrl: "./sort_button.html",
    styleUrls: ["./sort_button.scss"]
})
export class SortButtonComponent {
    @Input() currentState: number = 0;
    @Output() state: EventEmitter<number> = new EventEmitter<number>();

    nextState(): void {
        this.currentState = (this.currentState + 1) % 3;
        this.state.emit(this.currentState);
    }
}
