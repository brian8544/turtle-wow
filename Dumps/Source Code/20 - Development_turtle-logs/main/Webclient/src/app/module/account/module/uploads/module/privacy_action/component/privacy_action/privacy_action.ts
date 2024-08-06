import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {SelectOption} from "../../../../../../../../template/input/select_input/domain_value/select_option";

@Component({
    selector: "PrivacyAction",
    templateUrl: "./privacy_action.html",
    styleUrls: ["./privacy_action.scss"]
})
export class PrivacyActionComponent implements OnInit {

    @Input() initial_privacy_option: number = 0;
    @Input() initial_privacy_group: number = 0;
    @Output() privacy_changed: EventEmitter<[number, number]> = new EventEmitter();

    selected_privacy_option: number;
    privacy_options: Array<SelectOption> = [
        { value: 0, label_key: "Account.uploads.options.public" },
        { value: 1, label_key: "Account.uploads.options.not_listed" },
        // { value: 2, label_key: "Account.uploads.options.only_groups" },
    ];

    selected_privacy_group: number;
    privacy_groups: Array<SelectOption> = [
        { value: 0, label_key: "Account.uploads.no_groups" },
    ];

    private initialized: boolean = false;

    ngOnInit(): void {
        this.selected_privacy_option = this.initial_privacy_option;
        this.selected_privacy_group = this.initial_privacy_group;
        setTimeout(() => this.initialized = true, 250);
    }

    update_privacy_option(option: number): void {
        if (!this.initialized)
            return;
        this.selected_privacy_option = Number(option);
        this.privacy_changed.next([this.selected_privacy_option, this.selected_privacy_group]);
    }

    update_privacy_group(group: number): void {
        if (!this.initialized)
            return;
        this.selected_privacy_group = Number(group);
        this.privacy_changed.next([this.selected_privacy_option, this.selected_privacy_group]);
    }

    get only_groups_selected(): boolean {
        return this.selected_privacy_option === 2;
    }
}
