import {Component, OnInit} from "@angular/core";
import {HeaderColumn} from "../../../../../../template/table/module/table_header/domain_value/header_column";
import {BodyColumn} from "../../../../../../template/table/module/table_body/domain_value/body_column";
import {TinyUrlService} from "../../../../../tiny_url/service/tiny_url";
import {table_create_empty_filter, table_init_filter} from "../../../../../../template/table/utility/table_init_filter";
import {Severity} from "../../../../../../domain_value/severity";
import {SettingsService} from "../../../../../../service/settings";
import {DateService} from "../../../../../../service/date";
import {Localized} from "../../../../../../domain_value/localized";
import {InstanceMap} from "../../../../../../domain_value/instance_map";
import {DataService} from "../../../../../../service/data";
import {UploadsService} from "../../service/uploads";
import {NotificationService} from "../../../../../../service/notification";
import {AccountInformation} from "../../../../domain_value/account_information";

@Component({
    selector: "Uploads",
    templateUrl: "./uploads.html",
    styleUrls: ["./uploads.scss"]
})
export class UploadsComponent implements OnInit {
    header_columns: Array<HeaderColumn> = [
        {
            index: 0,
            filter_name: 'map_id',
            labelKey: "PvE.Search.raid",
            type: 3,
            type_range: [{value: -1, label_key: "PvE.Search.raid"}],
            col_type: 0
        },
        {index: 1, filter_name: 'start_ts', labelKey: "PvE.Search.start", type: 2, type_range: null, col_type: 1},
        {index: 2, filter_name: 'end_ts', labelKey: "PvE.Search.end", type: 2, type_range: null, col_type: 1},
    ];

    body_columns: Array<Array<BodyColumn>> = [];
    clientSide: boolean = false;
    responsiveHeadColumns: Array<number> = [0];
    responsiveModeWidthInPx: number = 560;
    num_characters: number = 0;

    private last_filter;
    private account_information: AccountInformation;

    constructor(
        public tinyUrlService: TinyUrlService,
        public dateService: DateService,
        private settingsService: SettingsService,
        private dataService: DataService,
        private uploadsService: UploadsService,
        private notificationService: NotificationService
    ) {
        this.dataService.get_maps_by_type(0).subscribe((instance_maps: Array<Localized<InstanceMap>>) => {
            instance_maps.forEach(inner_map => this.header_columns[0].type_range.push({
                value: inner_map.base.id,
                label_key: inner_map.localization
            }));
        });
    }

    ngOnInit(): void {
        let filter;
        if (!this.settingsService.check("table_filter_account_raids_search")) {
            filter = table_init_filter(this.header_columns);
            filter.end_ts.sorting = false;
            this.settingsService.set("table_filter_account_raids_search", filter);
        } else {
            filter = this.settingsService.get("table_filter_account_raids_search");
        }
        this.account_information = this.settingsService.get("ACCOUNT_INFORMATION");
        if (this.has_privacy_privilege && !this.header_columns[3]) {
            this.header_columns.push({
                index: 3,
                filter_name: 'privacy',
                labelKey: "Account.uploads.privacy_action",
                type: 3,
                type_range: [
                    {value: -1, label_key: "Account.uploads.privacy_action"},
                    {value: 0, label_key: "Account.uploads.options.public"},
                    {value: 1, label_key: "Account.uploads.options.not_listed"},
                    //{value: 2, label_key: "Account.uploads.options.only_groups"}
                ],
                col_type: 0
            });
        }
        if (!filter["privacy"])
            filter["privacy"] = table_create_empty_filter();

        this.last_filter = filter;
        this.onFilter(filter);
    }

    onFilter(filter: any): void {
        filter.map_difficulty = {filter: null, sorting: null};
        filter.guild = {filter: null, sorting: null};
        filter.server_id = {filter: null, sorting: null};
        this.uploadsService.search_raids(filter, (search_result) => {
            this.last_filter = filter;
            this.num_characters = search_result.num_items;
            this.body_columns = search_result.result.map(item => {
                const body_columns: Array<BodyColumn> = [];
                body_columns.push({
                    type: 3,
                    content: item.map_id.toString(),
                    args: {
                        icon: item.map_icon,
                        instance_meta_id: item.instance_meta_id,
                        can_delete: item.can_delete
                    }
                });
                body_columns.push({
                    type: 2,
                    content: item.start_ts.toFixed(0),
                    args: null
                });
                body_columns.push({
                    type: 2,
                    content: item.end_ts ? item.end_ts.toFixed(0) : '',
                    args: null
                });
                if (this.has_privacy_privilege)
                    body_columns.push({
                        type: 3,
                        content: item.privacy_type.toString(),
                        args: {
                            instance_meta_id: item.instance_meta_id,
                            privacy_type: item.privacy_type,
                            privacy_ref: item.privacy_ref
                        }
                    });
                return {
                    color: '',
                    columns: body_columns
                };
            });
        }, () => {
        });
    }

    delete_raid(instance_meta_id: number): void {
        this.uploadsService.delete_raid(instance_meta_id, () => {
            this.onFilter(this.last_filter);
            this.notificationService.propagate(Severity.Success, "Raid deleted!");
        });
    }

    get has_privacy_privilege(): boolean {
        return (this.account_information.access_rights & 4) === 4;
    }

    privacy_changed(instance_meta_id: number, [option, group]: [number, number]): void {
        this.uploadsService.update_privacy(instance_meta_id, option, group, () => {
            this.notificationService.propagate(Severity.Success, "Account.uploads.notifications.success");
        }, () => {
            this.notificationService.propagate(Severity.Error, "Account.uploads.notifications.failure");
        });
    }
}
