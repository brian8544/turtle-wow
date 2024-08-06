import {Injectable, OnDestroy} from "@angular/core";
import {TinyUrlService} from "../../../../../../tiny_url/service/tiny_url";
import {InstanceDataService} from "../../../../../service/instance_data";
import {Router} from "@angular/router";
import {InstanceViewerMeta} from "../../../../../domain_value/instance_viewer_meta";
import {Subscription} from "rxjs";
import {ViewerMode} from "../../../../../domain_value/viewer_mode";
import {RaidConfigurationService} from "../../../service/raid_configuration";
import {SettingsService} from "../../../../../../../service/settings";
import {KnechtUpdates} from "../../../../../domain_value/knecht_updates";
import {GraphDataService} from "../../../../raid_graph/service/graph_data";
import {RaidMeterExportService} from "../../../../raid_meter/service/raid_meter_export";

@Injectable({
    providedIn: "root",
})
export class ExportViewerService implements OnDestroy {

    private subscription: Subscription;

    private current_meta: InstanceViewerMeta;
    private viewer_mode: ViewerMode;

    constructor(
        private routerService: Router,
        private instanceDataService: InstanceDataService,
        private tinyUrlService: TinyUrlService,
        private raidConfigurationService: RaidConfigurationService,
        private settingsService: SettingsService,
        private graphDataService: GraphDataService,
        private raidMeterExportService: RaidMeterExportService
    ) {
        this.subscription = this.instanceDataService.meta.subscribe(meta => this.current_meta = meta);
        this.subscription.add(this.instanceDataService.knecht_updates.subscribe(([updates]) => {
            if (updates.includes(KnechtUpdates.FilterInitialized)) {
                this.import();
            }
        }));
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }

    public export(): void {
        this.tinyUrlService.set_tiny_url({
            type_id: 3,
            navigation_id: 9,
            url_suffix: this.routerService.url.replace("viewer/", ""),
            payload: {
                instance_meta_id: this.current_meta.instance_meta_id,
                selected_segments: [...this.raidConfigurationService.segment_filter.values()],
                selected_sources: [...this.raidConfigurationService.source_filter.values()],
                selected_targets: [...this.raidConfigurationService.target_filter.values()],
                selected_abilities: [...this.raidConfigurationService.ability_filter.values()],
                selected_boundaries: [this.raidConfigurationService.time_boundaries[0], this.raidConfigurationService.time_boundaries[1]],
                graph_mode: this.graphDataService.get_current_graph_mode(),
                graph_data_sets: this.graphDataService.get_selected_data_sets(),
                graph_events: this.graphDataService.get_selected_events(),
                graph_selected_source_auras: this.graphDataService.get_selected_source_auras(),
                graph_selected_target_auras: this.graphDataService.get_selected_target_auras(),
                graph_selected_source_spell_casts: this.graphDataService.get_selected_source_spell_cast_spell_ids(),
                meter_selections: [...this.raidMeterExportService.meter_selections.entries()],
            }
        });
    }

    public import(): void {
        const settings_key = "viewer_export:" + this.current_meta.instance_meta_id;
        if (!this.settingsService.check(settings_key))
            return;
        const payload = this.settingsService.get(settings_key);
        this.settingsService.delete(settings_key);
        this.raidConfigurationService.update_segment_filter(payload.selected_segments);
        this.raidConfigurationService.update_source_filter(payload.selected_sources);
        this.raidConfigurationService.update_target_filter(payload.selected_targets);
        this.raidConfigurationService.update_ability_filter(payload.selected_abilities);
        this.raidConfigurationService.update_time_boundaries(payload.selected_boundaries);
        this.raidConfigurationService.selection_overwrite$.next({
            viewer_mode: this.viewer_mode,
            segments: new Set(payload.selected_segments),
            sources: new Set(payload.selected_sources),
            targets: new Set(payload.selected_targets),
            abilities: new Set(payload.selected_abilities),
            boundaries: [payload.selected_boundaries[0], payload.selected_boundaries[1]]
        });
        this.graphDataService.overwrite_selection.next({
            mode: payload.graph_mode,
            data_sets: payload.graph_data_sets,
            events: payload.graph_events,
            source_auras: payload.graph_selected_source_auras,
            target_auras: payload.graph_selected_target_auras,
            source_spell_casts: payload.graph_selected_source_spell_casts
        });
        for (const selection of payload.meter_selections)
            this.raidMeterExportService.meter_selections$.next(selection);
    }

    public setViewerMode(viewer_mode: ViewerMode): void {
        this.viewer_mode = viewer_mode;
    }
}
