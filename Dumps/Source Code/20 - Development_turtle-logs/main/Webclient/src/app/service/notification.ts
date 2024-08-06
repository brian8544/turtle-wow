import {Injectable} from "@angular/core";
import {Severity} from "../domain_value/severity";
import {Notification} from "../material/notification";
import {ObserverPattern} from "../template/class_template/observer_pattern";

@Injectable({
    providedIn: "root",
})
export class NotificationService extends ObserverPattern {
    propagate(severity: Severity, message: string, msg_args?: any): void {
        super.notify(callback => callback.call(callback, new Notification(severity, message, !!msg_args ? msg_args : {})));
    }
}
