import {Component, ElementRef, OnDestroy, ViewChild} from "@angular/core";
import {EventLogService} from "../../service/event_log";
import {EventLogEntry} from "../../domain_value/event_log_entry";
import {Subscription} from "rxjs";
import {DateService} from "../../../../../../service/date";
import {ActivatedRoute, Router} from "@angular/router";
import {InstanceDataService} from "../../../../service/instance_data";
import {KnechtUpdates} from "../../../../domain_value/knecht_updates";
import {UnitService} from "../../../../service/unit";
import {SpellService} from "../../../../service/spell";
import {RaidConfigurationSelectionService} from "../../../raid_configuration_menu/service/raid_configuration_selection";
import {InstanceViewerMeta} from "../../../../domain_value/instance_viewer_meta";

@Component({
    selector: "RaidEventLog",
    templateUrl: "./raid_event_log.html",
    styleUrls: ["./raid_event_log.scss"],
    providers: [
        EventLogService
    ]
})
export class RaidEventLogComponent implements OnDestroy {

    @ViewChild("scroll_elem", {static: true}) scroll_elem: ElementRef;
    private subscription: Subscription;

    event_log_entries: Array<EventLogEntry> = [];
    private current_offset: number = 0;
    private event_log_entries_length: number = 0;

    private meta: InstanceViewerMeta;

    constructor(
        private eventLogService: EventLogService,
        public dateService: DateService,
        private activatedRouteService: ActivatedRoute,
        private instanceDataService: InstanceDataService,
        public unitService: UnitService,
        public spellService: SpellService,
        private raidConfigurationSelectionService: RaidConfigurationSelectionService,
        private router: Router
    ) {
        this.subscription = this.eventLogService.scrolled_page.subscribe(entries => {
            this.event_log_entries = entries;
            this.event_log_entries_length = entries.length;
        });
        this.subscription.add(this.activatedRouteService.firstChild?.paramMap.subscribe(params => {
            this.current_offset = 0;
            this.event_log_entries_length = 0;
            this.eventLogService.offset_changed.next(this.current_offset);
            this.eventLogService.set_actor(params.get("actor") === "to_actor");
        }));
        this.subscription.add(this.instanceDataService.knecht_updates.subscribe(([updates,]) => {
            if (updates.includes(KnechtUpdates.FilterChanging)) {
                this.event_log_entries = [];
                this.current_offset = 0;
                this.event_log_entries_length = 0;
            }
        }));
        this.subscription.add(this.instanceDataService.meta.subscribe(meta => this.meta = meta));
    }

    filter_by_source_id(id: number): void {
        this.router.navigate(["/viewer/" + this.meta.instance_meta_id + "/base"]);
        this.raidConfigurationSelectionService.select_sources([id]);
    }

    filter_by_target_id(id: number): void {
        this.router.navigate(["/viewer/" + this.meta.instance_meta_id + "/base"]);
        this.raidConfigurationSelectionService.select_targets([id]);
    }

    filter_by_ability_id(id: number): void {
        this.router.navigate(["/viewer/" + this.meta.instance_meta_id + "/base"]);
        this.raidConfigurationSelectionService.select_abilities([id]);
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }

    // TODO: Mobile?
    scrolled(scroll_event: any): void {
        scroll_event.preventDefault();

        if (scroll_event.deltaY > 0) {
            if (this.event_log_entries_length === 19)
                ++this.current_offset;
        } else {
            --this.current_offset;
            if (this.current_offset < 0)
                this.current_offset = 0;
        }
        this.eventLogService.offset_changed.next(this.current_offset);
    }

}
