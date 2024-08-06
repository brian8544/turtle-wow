import {Component, OnDestroy} from "@angular/core";
import {RaidConfigurationService} from "../../service/raid_configuration";
import {Subscription} from "rxjs";
import {DateService} from "../../../../../../service/date";
import {Segment} from "../../domain_value/segment";
import {EventSource} from "../../domain_value/event_source";
import {RaidConfigurationSelectionService} from "../../service/raid_configuration_selection";
import {EventAbility} from "../../domain_value/event_ability";
import {AdditionalButton} from "../../../../../../template/input/multi_select/domain_value/additional_button";
import {ExportViewerService} from "../../module/export_viewer/service/export_viewer";
import {InstanceDataService} from "../../../../service/instance_data";
import {CommunicationEvent} from "../../../../domain_value/communication_event";

@Component({
    selector: "RaidConfigurationMenu",
    templateUrl: "./raid_configuration_menu.html",
    styleUrls: ["./raid_configuration_menu.scss"],
    providers: [ExportViewerService]
})
export class RaidConfigurationMenuComponent implements OnDestroy {

    private subscription: Subscription = new Subscription();

    // closed: boolean = true;

    selected_items_segments: Array<any> = [];
    selected_items_sources: Array<any> = [];
    selected_items_targets: Array<any> = [];
    selected_items_abilities: Array<any> = [];

    list_items_segments: Array<any> = [];
    list_items_sources: Array<any> = [];
    list_items_targets: Array<any> = [];
    list_items_abilities: Array<any> = [];

    use_default_filter_segments: boolean = true;
    use_default_filter_sources: boolean = true;
    use_default_filter_targets: boolean = true;
    use_default_filter_abilities: boolean = true;

    sources_additional_button: Array<AdditionalButton> = [
        {
            id: -1, label: "All Players", list_selection_callback: (button, selected_list, current_list, checked) =>
                this.additional_button_collection_if(button, selected_list, current_list, checked, (item) => item.is_player)
        },
        {
            id: -2, label: "All Creatures", list_selection_callback: (button, selected_list, current_list, checked) =>
                this.additional_button_collection_if(button, selected_list, current_list, checked, (item) => !item.is_player)
        },
        {
            id: -3, label: "All Bosses", list_selection_callback: (button, selected_list, current_list, checked) =>
                this.additional_button_collection_if(button, selected_list, current_list, checked, (item) => item.is_boss)
        },
        {
            id: -4, label: "All Warriors", list_selection_callback: (button, selected_list, current_list, checked) =>
                this.additional_button_collection_if(button, selected_list, current_list, checked, (item) => item.hero_class_id === 1)
        },
        {
            id: -5, label: "All Paladins", list_selection_callback: (button, selected_list, current_list, checked) =>
                this.additional_button_collection_if(button, selected_list, current_list, checked, (item) => item.hero_class_id === 2)
        },
        {
            id: -6, label: "All Hunter", list_selection_callback: (button, selected_list, current_list, checked) =>
                this.additional_button_collection_if(button, selected_list, current_list, checked, (item) => item.hero_class_id === 3)
        },
        {
            id: -7, label: "All Rogues", list_selection_callback: (button, selected_list, current_list, checked) =>
                this.additional_button_collection_if(button, selected_list, current_list, checked, (item) => item.hero_class_id === 4)
        },
        {
            id: -8, label: "All Priests", list_selection_callback: (button, selected_list, current_list, checked) =>
                this.additional_button_collection_if(button, selected_list, current_list, checked, (item) => item.hero_class_id === 5)
        },
        {
            id: -9,
            label: "All Death Knights",
            list_selection_callback: (button, selected_list, current_list, checked) =>
                this.additional_button_collection_if(button, selected_list, current_list, checked, (item) => item.hero_class_id === 6)
        },
        {
            id: -10, label: "All Shamans", list_selection_callback: (button, selected_list, current_list, checked) =>
                this.additional_button_collection_if(button, selected_list, current_list, checked, (item) => item.hero_class_id === 7)
        },
        {
            id: -11, label: "All Mages", list_selection_callback: (button, selected_list, current_list, checked) =>
                this.additional_button_collection_if(button, selected_list, current_list, checked, (item) => item.hero_class_id === 8)
        },
        {
            id: -12, label: "All Warlocks", list_selection_callback: (button, selected_list, current_list, checked) =>
                this.additional_button_collection_if(button, selected_list, current_list, checked, (item) => item.hero_class_id === 9)
        },
        {
            id: -13, label: "All Druids", list_selection_callback: (button, selected_list, current_list, checked) =>
                this.additional_button_collection_if(button, selected_list, current_list, checked, (item) => item.hero_class_id === 11)
        },
    ];
    segments_additional_button: Array<AdditionalButton> = [];

    time_slider_reference_start: number = 0;
    time_slider_reference_end: number = 1;
    time_slider_start_reference: number = 0;
    time_slider_end_reference: number = 1;

    upload_id: number = 0;

    constructor(
        private raidConfigurationService: RaidConfigurationService,
        private raidConfigurationSelectionService: RaidConfigurationSelectionService,
        public dateService: DateService,
        private instanceDataService: InstanceDataService
    ) {
        this.subscription.add(this.raidConfigurationService.segments.subscribe(segments => this.handle_segments(segments, true)));
        this.subscription.add(this.raidConfigurationService.sources.subscribe(sources => this.handle_sources(sources, true)));
        this.subscription.add(this.raidConfigurationService.targets.subscribe(targets => this.handle_targets(targets, true)));
        this.subscription.add(this.raidConfigurationService.abilities.subscribe(abilities => this.handle_abilities(abilities, true)));
        this.subscription.add(this.raidConfigurationSelectionService.source_selection.subscribe(selection =>
            this.selected_items_sources = this.selected_items_sources.filter(item => selection.includes(item.id))));
        this.subscription.add(this.raidConfigurationSelectionService.target_selection.subscribe(selection =>
            this.selected_items_targets = this.selected_items_targets.filter(item => selection.includes(item.id))));
        this.subscription.add(this.raidConfigurationSelectionService.ability_selection.subscribe(selection =>
            this.selected_items_abilities = this.selected_items_abilities.filter(item => selection.includes(item.id))));

        this.subscription.add(this.raidConfigurationService.selection_overwrite$.subscribe(stack_item => {
            this.selected_items_segments = this.list_items_segments.filter(item => stack_item.segments.has(item.id));
            this.selected_items_sources = this.list_items_sources.filter(item => stack_item.sources.has(item.id));
            this.selected_items_targets = this.list_items_targets.filter(item => stack_item.targets.has(item.id));
            this.selected_items_abilities = this.list_items_abilities.filter(item => stack_item.abilities.has(item.id));
            this.time_slider_start_reference = stack_item.boundaries[0];
            this.time_slider_end_reference = stack_item.boundaries[1];
        }));

        this.subscription.add(this.instanceDataService.communicator.subscribe(([com_event, payload]) => {
            if (com_event === CommunicationEvent.GraphBoundaries) {
                const time_frame = this.time_slider_end_reference - this.time_slider_start_reference;
                this.time_slider_end_reference = this.time_slider_start_reference + payload[1] * time_frame;
                this.time_slider_start_reference = this.time_slider_start_reference + payload[0] * time_frame;
                this.raidConfigurationService.update_time_boundaries([this.time_slider_start_reference, this.time_slider_end_reference], true);
            }
        }));

        this.subscription.add(this.instanceDataService.meta.subscribe(meta => {
            if (!!meta)
                this.upload_id = meta.upload_id;
        }));

        this.subscription.add(this.raidConfigurationService.boundaries_updated$.subscribe(boundaries => {
            this.time_slider_start_reference = boundaries[0];
            this.time_slider_end_reference = boundaries[1];
        }));
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }

    on_segment_selection_updated(): void {
        this.use_default_filter_segments = false;
        this.raidConfigurationService.update_segment_filter(this.selected_items_segments.map(segment => segment.id), true);
        this.update_start_end_time_slider_boundaries();
    }

    on_source_selection_updated(): void {
        this.use_default_filter_sources = false;
        this.raidConfigurationService.update_source_filter(this.selected_items_sources.map(source => source.id), true);
    }

    on_target_selection_updated(): void {
        this.use_default_filter_targets = false;
        this.raidConfigurationService.update_target_filter(this.selected_items_targets.map(target => target.id), true);
    }

    on_ability_selection_updated(): void {
        this.use_default_filter_targets = false;
        this.raidConfigurationService.update_ability_filter(this.selected_items_abilities.map(ability => ability.id), true);
    }

    private update_additional_segment_buttons(segments: Array<Segment>): void {
        const additional_button = [];
        additional_button.push({
            id: -1,
            label: "All Kill Attempts",
            list_selection_callback: (button, selected_list, current_list, checked) =>
                this.additional_button_collection_if(button, selected_list, current_list, checked, (item) => item.is_kill)
        });

        additional_button.push({
            id: -2,
            label: "All Wipe Attempts",
            list_selection_callback: (button, selected_list, current_list, checked) =>
                this.additional_button_collection_if(button, selected_list, current_list, checked, (item) => !item.is_kill)
        });

        additional_button.push({
            id: -3,
            label: "Trash & OOC segments",
            list_selection_callback: (button, selected_list, current_list, checked) =>
                this.additional_button_collection_if(button, selected_list, current_list, checked, (item) => item.id < 0)
        });

        let count = -4;
        const already_added_encounter = new Set();
        for (const segment of segments) {
            if (segment.id <= 0 || already_added_encounter.has(segment.encounter_id)) {
                continue;
            }
            already_added_encounter.add(segment.encounter_id);
            additional_button.push({
                id: count--,
                label: segment.label,
                list_selection_callback: (button, selected_list, current_list, checked) =>
                    this.additional_button_collection_if(button, selected_list, current_list, checked, (item) => item.encounter_id === segment.encounter_id)
            });
        }
        this.segments_additional_button = additional_button;
    }

    private async handle_segments(segments: Array<Segment>, update_filter: boolean) {
        const new_list_items = [];
        for (const segment of segments) {
            new_list_items.push({
                id: segment.id,
                label: segment.label.toString() + " - " + this.dateService.toTimeSpan(segment.duration) + " - "
                    + (segment.is_kill ? "Kill" : "Attempt") + " - " + this.dateService.toRPLLTime(segment.start_ts),
                encounter_id: segment.encounter_id,
                is_kill: segment.is_kill,
                start_ts: segment.start_ts,
                duration: segment.duration
            });
        }

        const new_selected_items = [];
        if (this.use_default_filter_segments) {
            for (const list_item of new_list_items) {
                if (list_item.is_kill) {
                    new_selected_items.push(list_item);
                }
            }
        } else {
            for (const selected_item of this.selected_items_segments) {
                if (new_list_items.find(item => item.id === selected_item.id))
                    new_selected_items.push(selected_item);
            }
        }
        this.list_items_segments = new_list_items;
        this.selected_items_segments = new_selected_items;

        if (this.use_default_filter_segments && update_filter)
            this.raidConfigurationService.update_segment_filter(this.selected_items_segments.map(item => item.id));
        this.update_start_end_time_slider_boundaries();
        this.update_additional_segment_buttons(segments);
    }

    private async handle_sources(sources: Array<EventSource>, update_filter: boolean) {
        const new_list_items = [];
        const new_selected_items = [];
        for (const source of sources) {
            const list_item = {
                id: source.id,
                label: source.label.toString(),
                is_player: source.is_player,
                is_boss: source.is_boss,
                hero_class_id: source.hero_class_id
            };
            new_list_items.push(list_item);
            if (this.use_default_filter_sources && source.is_player)
                new_selected_items.push(list_item);
        }

        if (!this.use_default_filter_sources) {
            for (const selected_item of this.selected_items_sources) {
                if (new_list_items.find(item => item.id === selected_item.id))
                    new_selected_items.push(selected_item);
            }
        }
        this.list_items_sources = new_list_items;
        this.selected_items_sources = new_selected_items;

        if (this.use_default_filter_sources && update_filter)
            this.raidConfigurationService.update_source_filter(this.selected_items_sources.map(source => source.id));
    }

    private async handle_targets(targets: Array<EventSource>, update_filter: boolean) {
        const new_list_items = [];
        const new_selected_items = [];
        for (const target of targets) {
            const list_item = {
                id: target.id,
                label: target.label.toString(),
                is_player: target.is_player,
                is_boss: target.is_boss,
                hero_class_id: target.hero_class_id
            };
            new_list_items.push(list_item);

            if (this.use_default_filter_targets)
                new_selected_items.push(list_item);

        }

        if (!this.use_default_filter_targets) {
            for (const selected_item of this.selected_items_targets) {
                if (new_list_items.find(item => item.id === selected_item.id))
                    new_selected_items.push(selected_item);
            }
        }
        this.list_items_targets = new_list_items;
        this.selected_items_targets = new_selected_items;

        if (this.use_default_filter_targets && update_filter)
            this.raidConfigurationService.update_target_filter(this.selected_items_targets.map(target => target.id));
    }

    private async handle_abilities(abilities: Array<EventAbility>, update_filter: boolean) {
        const new_list_items = [];
        const new_selected_items = [];
        for (const ability of abilities) {
            const list_item = {
                id: ability.id,
                label: ability.label.toString() + " (Id: " + ability.id.toString() + ")"
            };
            new_list_items.push(list_item);

            if (this.use_default_filter_abilities)
                new_selected_items.push(list_item);
        }

        if (!this.use_default_filter_abilities) {
            for (const selected_item of this.selected_items_abilities) {
                if (new_list_items.find(item => item.id === selected_item.id))
                    new_selected_items.push(selected_item);
            }
        }
        this.list_items_abilities = new_list_items;
        this.selected_items_abilities = new_selected_items;

        if (this.use_default_filter_abilities && update_filter)
            this.raidConfigurationService.update_ability_filter(this.selected_items_abilities.map(ability => ability.id));
    }

    private additional_button_collection_if(button: AdditionalButton, selected_list: Array<any>,
                                            current_list: Array<any>, checked: boolean, toggle_condition: (data_item: any) => boolean): Array<any> {
        if (checked) {
            const result = [...selected_list];
            for (const item of current_list) {
                if (toggle_condition(item) && selected_list.find(s_item => s_item.id === item.id) === undefined)
                    result.push(item);
            }
            return result;
        } else {
            const result = [];
            for (const item of selected_list) {
                const data_item = current_list.find(d_item => d_item.id === item.id);
                if (!toggle_condition(data_item))
                    result.push(item);
            }
            return result;
        }
    }

    private update_start_end_time_slider_boundaries(): void {
        let new_ref_start: number = Number.MAX_VALUE;
        let new_ref_end: number = Number.MIN_VALUE;
        for (const segment of this.selected_items_segments) {
            let actual_segment = this.list_items_segments.find(item => item.id === segment.id);
            if (actual_segment.start_ts < new_ref_start) {
                new_ref_start = actual_segment.start_ts;
            }
            if (actual_segment.start_ts + actual_segment.duration > new_ref_end) {
                new_ref_end = actual_segment.start_ts + actual_segment.duration;
            }
        }

        if (new_ref_start != Number.MAX_VALUE && new_ref_end != Number.MIN_VALUE && (new_ref_start != this.time_slider_reference_start || new_ref_end != this.time_slider_reference_end)) {
            this.time_slider_reference_start = new_ref_start;
            this.time_slider_start_reference = new_ref_start;
            this.time_slider_reference_end = new_ref_end;
            this.time_slider_end_reference = new_ref_end;
            this.raidConfigurationService.update_time_boundaries([this.time_slider_start_reference, this.time_slider_end_reference], true);
        }
    }

    timeBoundariesUpdated(is_start: boolean, time: number): void {
        if (is_start) {
            this.time_slider_start_reference = time;
        } else {
            this.time_slider_end_reference = time;
        }
        this.raidConfigurationService.update_time_boundaries([this.time_slider_start_reference, this.time_slider_end_reference], true);
    }

    multi_thumb_label_function(dateService: DateService, timestamp: number): string {
        return dateService.toRPLLTime(timestamp)
    }
}
