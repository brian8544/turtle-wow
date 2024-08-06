import {Component} from "@angular/core";
import {InstanceDataService} from "../../../../service/instance_data";
import {DataService} from "../../../../../../service/data";
import {InstanceViewerMeta} from "../../../../domain_value/instance_viewer_meta";
import {Observable, of} from "rxjs";
import {DateService} from "../../../../../../service/date";

@Component({
    selector: "RaidTitleBar",
    templateUrl: "./raid_title_bar.html",
    styleUrls: ["./raid_title_bar.scss"]
})
export class RaidTitleBarComponent {

    instance_meta: InstanceViewerMeta;
    instance_name: Observable<string>;
    server_name: Observable<string>;
    server_patch: Observable<string>;
    expansion: Observable<number>;
    duration: Observable<string>;
    instance_start: Observable<string>;

    constructor(
        private instanceDataService: InstanceDataService,
        private dataService: DataService,
        private dateService: DateService
    ) {

        this.instanceDataService.meta.subscribe(meta => {
            if (!meta) return;

            this.instance_meta = meta;
            this.instance_name = this.dataService.get_map_name_by_id(this.instance_meta.map_id);
            this.dataService.get_server_by_id(this.instance_meta.server_id)
                .subscribe(server => {
                    this.expansion = of(server?.expansion_id);
                    this.server_name = of(server?.name);
                    this.server_patch = of(server?.patch);
                });
            this.duration = this.get_duration();
            this.instance_start = of(this.dateService.toRPLLLongDate(this.instance_meta.start_ts));
        });

    }

    private get_duration(): Observable<string> {
        return of(!!this.instance_meta.end_ts ? this.dateService.toTimeSpan(this.instance_meta.end_ts - this.instance_meta.start_ts) : 'LIVE');
    }
}
