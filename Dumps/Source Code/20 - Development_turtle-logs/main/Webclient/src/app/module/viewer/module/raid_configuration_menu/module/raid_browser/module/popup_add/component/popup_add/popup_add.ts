import {Component, EventEmitter, Input, OnChanges, OnDestroy, Output} from "@angular/core";
import {Preset} from "../../../../domain_value/preset";
import {SelectOption} from "../../../../../../../../../../template/input/select_input/domain_value/select_option";
import {NotificationService} from "../../../../../../../../../../service/notification";
import {Severity} from "../../../../../../../../../../domain_value/severity";
import {RaidConfigurationService} from "../../../../../../service/raid_configuration";
import {Subscription} from "rxjs";

@Component({
    selector: "PopupAdd",
    templateUrl: "./popup_add.html",
    styleUrls: ["./popup_add.scss"]
})
export class PopupAddComponent implements OnChanges, OnDestroy {
    private static EVENT_TYPES: Array<[number, string]> = [
        [0, "Spell casts"],
        [1, "Deaths"],
        [2, "Combat states"],
        [3, "Loot"],
        [4, "Positions"],
        [5, "Power gained"],
        [6, "Aura applications"],
        [7, "Interrupts"],
        [8, "Spell steals"],
        [9, "Dispels"],
        [10, "Threat wipes"],
        [11, "Summons"],
        [12, "Melee damage"],
        [13, "Spell damage"],
        [14, "Heal"],
        [15, "Threat"]
    ];
    private static HIT_TYPES: Array<[number, string]> = [
        [1, "OffHand"],
        [2, "Hit"],
        [4, "Crit"],
        [8, "Partial resist"],
        [16, "Full resist"],
        [32, "Miss"],
        [64, "Partial absorb"],
        [128, "Full absorb"],
        [256, "Glancing"],
        [512, "Crushing"],
        [1024, "Evade"],
        [2048, "Dodge"],
        [4096, "Parry"],
        [8192, "Immune"],
        [16384, "Environment"],
        [32768, "Deflect"],
        [65536, "Interrupt"],
        [131072, "Partial block"],
        [262144, "Full block"],
        [524288, "Split"],
        [1048576, "Reflect"]
    ];

    private subscription: Subscription = new Subscription();

    @Input() presets: Array<Preset>;
    @Output() close_widget: EventEmitter<void> = new EventEmitter();
    @Output() add_preset: EventEmitter<Preset> = new EventEmitter();

    load_presets: Array<SelectOption> = [];
    event_types: Array<any> = [];
    hit_types: Array<any> = [];
    sources: Array<any> = [];
    targets: Array<any> = [];
    abilities: Array<any> = [];

    selected_preset: string = "";
    preset_name: string = "";
    selected_event_types: Array<any> = [];
    selected_sources: Array<any> = [];
    selected_targets: Array<any> = [];
    selected_abilities: Array<any> = [];
    selected_hit_types: Array<any> = [];

    constructor(
        private notificationService: NotificationService,
        private raidConfigurationService: RaidConfigurationService
    ) {
        this.subscription.add(this.raidConfigurationService.sources.subscribe(items => {
            this.sources = [{id: -1, label: "Everything"}, {id: -2, label: "Players"}, {id: -3, label: "Creatures"}].concat(items.map(item => {
                if (item.is_player)
                    return {id: item.id, label: item.label};
                return {id: item.npc_id, label: item.label};
            }));
        }));
        this.subscription.add(this.raidConfigurationService.targets.subscribe(items => {
            this.targets = [{id: -1, label: "Everything"}, {id: -2, label: "Players"}, {id: -3, label: "Creatures"}].concat(items.map(item => {
                if (item.is_player)
                    return {id: item.id, label: item.label};
                return {id: item.npc_id, label: item.label};
            }));
        }));
        this.subscription.add(this.raidConfigurationService.abilities.subscribe(items => {
            this.abilities = [{id: -1, label: "Everything"}].concat(items.map(item => {
                return {id: item.id, label: item.label};
            }));
        }));
    }

    ngOnChanges(): void {
        if (this.presets.length > 0 && this.selected_preset === "")
            this.selected_preset = this.presets[0].name;

        this.load_presets = this.select_presets;
        this.event_types = this.select_event_types;
        this.hit_types = this.select_hit_types;
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }

    get select_presets(): Array<SelectOption> {
        return this.presets.map(preset => {
            return {value: preset.name, label_key: preset.name};
        });
    }

    get select_event_types(): Array<any> {
        return [{id: -1, label: "Everything"}].concat(PopupAddComponent.EVENT_TYPES.map(evt_type => {
            return {id: evt_type[0], label: evt_type[1]};
        }));
    }

    get select_hit_types(): Array<any> {
        return [{id: -1, label: "Everything"}].concat(PopupAddComponent.HIT_TYPES.map(evt_type => {
            return {id: evt_type[0], label: evt_type[1]};
        }));
    }

    load_preset(): void {
        const preset = this.presets.find(preset => preset.name === this.selected_preset);
        if (!preset) {
            this.notificationService.propagate(Severity.Warning, "Could not load preset!");
            return;
        }

        this.preset_name = preset.name;
        this.selected_event_types = this.event_types.filter(evt => preset.event_types.includes(evt.id));
        this.selected_sources = this.sources.filter(evt => preset.sources.includes(evt.id));
        this.selected_targets = this.targets.filter(evt => preset.targets.includes(evt.id));
        this.selected_abilities = this.abilities.filter(evt => preset.abilities.includes(evt.id));
        this.selected_hit_types = this.hit_types.filter(evt => preset.hit_types.includes(evt.id));
    }

    save_preset(): void {
        if (this.preset_name.length < 1) {
            this.notificationService.propagate(Severity.Error, "Preset name must not be empty!");
            return;
        }

        if (this.selected_event_types.length < 1) {
            this.notificationService.propagate(Severity.Error, "At least one event type must be selected!");
            return;
        }

        if (this.selected_sources.length < 1) {
            this.notificationService.propagate(Severity.Error, "At least one source must be selected!");
            return;
        }

        if (this.selected_targets.length < 1) {
            this.notificationService.propagate(Severity.Error, "At least one target must be selected!");
            return;
        }

        if (this.selected_abilities.length < 1) {
            this.notificationService.propagate(Severity.Error, "At least one ability must be selected!");
            return;
        }

        if (this.selected_hit_types.length < 1) {
            this.notificationService.propagate(Severity.Error, "At least one hit type must be selected!");
            return;
        }

        this.add_preset.next({
            name: this.preset_name,
            event_types: this.selected_event_types.map(item => item.id),
            sources: this.selected_sources.map(item => item.id),
            targets: this.selected_targets.map(item => item.id),
            abilities: this.selected_abilities.map(item => item.id),
            hit_types: this.selected_hit_types.map(item => item.id),
        });
    }

    selected_event_types_changed(selected_items: Array<any>): void {
        const old_contains_everything: boolean = !!this.selected_event_types.find(item => item.id === -1);
        const new_contains_everything: boolean = !!selected_items.find(item => item.id === -1);
        if (!old_contains_everything && new_contains_everything) {
            this.selected_event_types = selected_items.filter(item => item.id === -1);
        } else if (old_contains_everything && selected_items.length > 1) {
            this.selected_event_types = selected_items.filter(item => item.id !== -1);
        } else {
            this.selected_event_types = selected_items;
        }
    }

    selected_hit_types_changed(selected_items: Array<any>): void {
        const old_contains_everything: boolean = !!this.selected_hit_types.find(item => item.id === -1);
        const new_contains_everything: boolean = !!selected_items.find(item => item.id === -1);
        if (!old_contains_everything && new_contains_everything) {
            this.selected_hit_types = selected_items.filter(item => item.id === -1);
        } else if (old_contains_everything && selected_items.length > 1) {
            this.selected_hit_types = selected_items.filter(item => item.id !== -1);
        } else {
            this.selected_hit_types = selected_items;
        }
    }

    selected_sources_changed(selected_items: Array<any>): void {
        const old_contains_everything: boolean = !!this.selected_sources.find(item => item.id === -1);
        const new_contains_everything: boolean = !!selected_items.find(item => item.id === -1);
        if (!old_contains_everything && new_contains_everything) {
            this.selected_sources = selected_items.filter(item => item.id === -1);
        } else if (old_contains_everything && selected_items.length > 1) {
            this.selected_sources = selected_items.filter(item => item.id !== -1);
        } else {
            this.selected_sources = selected_items;
        }
    }

    selected_targets_changed(selected_items: Array<any>): void {
        const old_contains_everything: boolean = !!this.selected_targets.find(item => item.id === -1);
        const new_contains_everything: boolean = !!selected_items.find(item => item.id === -1);
        if (!old_contains_everything && new_contains_everything) {
            this.selected_targets = selected_items.filter(item => item.id === -1);
        } else if (old_contains_everything && selected_items.length > 1) {
            this.selected_targets = selected_items.filter(item => item.id !== -1);
        } else {
            this.selected_targets = selected_items;
        }
    }

    selected_abilities_changed(selected_items: Array<any>): void {
        const old_contains_everything: boolean = !!this.selected_abilities.find(item => item.id === -1);
        const new_contains_everything: boolean = !!selected_items.find(item => item.id === -1);
        if (!old_contains_everything && new_contains_everything) {
            this.selected_abilities = selected_items.filter(item => item.id === -1);
        } else if (old_contains_everything && selected_items.length > 1) {
            this.selected_abilities = selected_items.filter(item => item.id !== -1);
        } else {
            this.selected_abilities = selected_items;
        }
    }
}
