import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Notification} from "src/app/material/notification";

@Component({
    selector: "Notification",
    templateUrl: "./notification.html",
    styleUrls: ["./notification.scss"]
})
export class NotificationComponent {
    @Input() index: number;
    @Input() context: Notification;
    @Output() closed: EventEmitter<number> = new EventEmitter();

    close(): void {
        this.closed.emit(this.index);
    }
}
