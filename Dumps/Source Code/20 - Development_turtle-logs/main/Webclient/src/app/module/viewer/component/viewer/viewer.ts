import {Component, OnDestroy} from "@angular/core";
import {InstanceDataService} from "../../service/instance_data";
import {ActivatedRoute} from "@angular/router";
import {UnitService} from "../../service/unit";
import {ViewerMode} from "../../domain_value/viewer_mode";
import {SpellService} from "../../service/spell";
import {RaidConfigurationSelectionService} from "../../module/raid_configuration_menu/service/raid_configuration_selection";
import {RaidConfigurationService} from "../../module/raid_configuration_menu/service/raid_configuration";
import {Subscription} from "rxjs";
import {GraphDataService} from "../../module/raid_graph/service/graph_data";
import {RaidMeterExportService} from "../../module/raid_meter/service/raid_meter_export";

@Component({
    selector: "Viewer",
    templateUrl: "./viewer.html",
    styleUrls: ["./viewer.scss"],
    providers: [
        RaidMeterExportService,
        RaidConfigurationService,
        RaidConfigurationSelectionService,
        GraphDataService,
        InstanceDataService,
        UnitService,
        SpellService
    ]
})
export class ViewerComponent implements OnDestroy {

    private subscription_meta: Subscription;
    private subscription_route: Subscription;

    private instance_meta_id: number;
    private current_mode: ViewerMode = ViewerMode.Base;

    empty_loot: boolean = true;

    constructor(
        private instanceDataService: InstanceDataService,
        private activatedRouteService: ActivatedRoute,
        private unitService: UnitService,
        private spellService: SpellService
    ) {
        this.subscription_route = this.activatedRouteService.paramMap.subscribe(params => {
            this.instance_meta_id = Number(params.get('instance_meta_id'));
            this.instanceDataService.instance_meta_id = this.instance_meta_id;

            const route_mode = params.get("mode") as ViewerMode;
            if ([ViewerMode.Base, ViewerMode.Ability, ViewerMode.Detail, ViewerMode.EventLog].includes(route_mode)) {
                this.current_mode = route_mode;
            }
        });
        this.subscription_meta = this.instanceDataService.meta.subscribe(meta => {
            this.unitService.set_server_id(meta?.server_id);
            this.unitService.set_expansion_id(meta?.expansion_id);
            this.spellService.set_server_id(meta?.server_id);
            this.spellService.set_expansion_id(meta?.expansion_id);
        });
    }

    ngOnDestroy(): void {
        this.subscription_route?.unsubscribe();
        this.subscription_meta?.unsubscribe();
    }

    is_base_mode(): boolean {
        return this.current_mode === ViewerMode.Base;
    }

    is_ability_mode(): boolean {
        return this.current_mode === ViewerMode.Ability;
    }

    is_detail_mode(): boolean {
        return this.current_mode === ViewerMode.Detail;
    }

    is_event_log_mode(): boolean {
        return this.current_mode === ViewerMode.EventLog;
    }
}
