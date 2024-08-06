import {Component, Input} from "@angular/core";
import {EventLogEntry} from "../../../../../viewer/module/raid_event_log/domain_value/event_log_entry";
import {DateService} from "../../../../../../service/date";
import {Observable, of} from "rxjs";

@Component({
    selector: "ViewerEventLogTooltip",
    templateUrl: "./viewer_event_log_tooltip.html",
    styleUrls: ["./viewer_event_log_tooltip.scss"]
})
export class ViewerEventLogTooltipComponent {

    @Input() payload: () => Observable<Array<EventLogEntry>>;

    pending_observable$: Observable<Array<EventLogEntry>>;

    constructor(
        public dateService: DateService
    ) {
    }

    get pending_observable(): Observable<Array<EventLogEntry>> {
        this.get_payload();
        return this.pending_observable$;
    }

    private get_payload(): void {
        if (!!this.pending_observable$)
            return;
        if (!this.payload)
            this.pending_observable$ = of([]);
        this.pending_observable$ = this.payload.call(this.payload);
    }
}
