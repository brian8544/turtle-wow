import {Component, EventEmitter, Input, OnChanges, Output} from "@angular/core";
import {Preset} from "../../../../domain_value/preset";
import {SelectOption} from "../../../../../../../../../../template/input/select_input/domain_value/select_option";

@Component({
    selector: "PopupRemove",
    templateUrl: "./popup_remove.html",
    styleUrls: ["./popup_remove.scss"]
})
export class PopupRemoveComponent implements OnChanges {

    @Input() presets: Array<Preset>;
    @Output() close_widget: EventEmitter<void> = new EventEmitter();
    @Output() remove: EventEmitter<string> = new EventEmitter<string>();

    selected_option: string = "";

    ngOnChanges(): void {
        if (this.presets.length > 0 && this.selected_option === "")
            this.selected_option = this.presets[0].name;
    }

    get select_options(): Array<SelectOption> {
        return this.presets.map(preset => {
            return {value: preset.name, label_key: preset.name};
        });
    }
}
