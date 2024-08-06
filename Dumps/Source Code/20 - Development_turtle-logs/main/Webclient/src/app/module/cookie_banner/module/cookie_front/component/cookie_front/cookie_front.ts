import {Component, EventEmitter, Output} from "@angular/core";
import {environment} from "../../../../../../../environments/environment";

@Component({
    selector: "CookieFront",
    templateUrl: "./cookie_front.html",
    styleUrls: ["./cookie_front.scss"]
})
export class CookieFrontComponent {
    @Output() show_options: EventEmitter<boolean> = new EventEmitter();
    @Output() agree_all: EventEmitter<boolean> = new EventEmitter();
    @Output() reject_all: EventEmitter<boolean> = new EventEmitter();

    translation_options: any = {company: ""};

    constructor() {
        this.translation_options.company = environment.company;
    }

    emit_show_options(): void {
        this.show_options.emit(true);
    }

    emit_reject_all(): void {
        this.reject_all.emit(true);
    }

    emit_agree_all(): void {
        this.agree_all.emit(true);
    }
}
