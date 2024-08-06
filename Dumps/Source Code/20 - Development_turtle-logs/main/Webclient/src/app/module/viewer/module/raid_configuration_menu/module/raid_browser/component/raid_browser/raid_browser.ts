import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {Preset} from "../../domain_value/preset";
import {NotificationService} from "../../../../../../../../service/notification";
import {Severity} from "../../../../../../../../domain_value/severity";
import {SettingsService} from "../../../../../../../../service/settings";
import {InstanceDataService} from "../../../../../../service/instance_data";

@Component({
    selector: "RaidBrowser",
    templateUrl: "./raid_browser.html",
    styleUrls: ["./raid_browser.scss"]
})
export class RaidBrowserComponent implements OnInit {

    presets: Array<Preset> = [];

    show_remove_widget: boolean = false;
    show_add_widget: boolean = false;

    options: Array<any> = [];
    selected_options: Array<any> = [];

    constructor(
        private notificationService: NotificationService,
        private settingsService: SettingsService,
        private instanceDataService: InstanceDataService
    ) {
    }

    ngOnInit(): void {
        if (this.settingsService.check("viewer_presets"))
            this.presets = this.settingsService.get("viewer_presets");
        this.reload_select();
    }

    toggleRemoveWidget(): void {
        this.show_add_widget = false;
        this.show_remove_widget = !this.show_remove_widget;
    }

    toggleAddWidget(): void {
        this.show_remove_widget = false;
        this.show_add_widget = !this.show_add_widget;
    }

    close_remove_widget(): void {
        this.show_remove_widget = false;
    }

    close_add_widget(): void {
        this.show_add_widget = false;
    }

    remove_preset(preset_name: string): void {
        this.presets = this.presets.filter(preset => preset.name !== preset_name);
        this.settingsService.set("viewer_presets", this.presets);
        this.notificationService.propagate(Severity.Success, "Preset has been removed!");
        this.reload_select();
    }

    add_preset(preset: Preset): void {
        const current_presets = this.presets.filter(i_preset => i_preset.name !== preset.name);
        current_presets.push(preset);
        this.presets = current_presets;
        this.settingsService.set("viewer_presets", this.presets);
        this.notificationService.propagate(Severity.Success, "Preset has been added!");
        this.reload_select();
    }

    selected_presets_changed(presets: Array<any>): void {
        const old_contains_everything: boolean = !!this.selected_options.find(item => item.id === "DEFAULT");
        const new_contains_everything: boolean = !!presets.find(item => item.id === "DEFAULT");
        if (!old_contains_everything && new_contains_everything) {
            this.selected_options = presets.filter(item => item.id === "DEFAULT");
        } else if (old_contains_everything && presets.length > 1) {
            this.selected_options = presets.filter(item => item.id !== "DEFAULT");
        } else {
            this.selected_options = presets;
        }
    }

    apply(): void {
        if (this.selected_options.length === 1 && this.selected_options[0].id === "DEFAULT") {
            this.instanceDataService.apply_preset([]);
            return;
        }
        this.instanceDataService.apply_preset(this.selected_options.map(item => this.presets.find(preset => preset.name === item.id)));
    }

    private reload_select(): void {
        this.options = [{id: "DEFAULT", label: "Default filter"}].concat(this.presets.map(preset => {
            return {id: preset.name, label: preset.name};
        }));
    }
}
