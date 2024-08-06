import {Component, Input, OnChanges, OnInit} from "@angular/core";
import {RecentRaidsService} from "../../service/recent_raids";
import {HeaderColumn} from "../../../../../../../../template/table/module/table_header/domain_value/header_column";
import {BodyColumn} from "../../../../../../../../template/table/module/table_body/domain_value/body_column";
import {DateService} from "../../../../../../../../service/date";
import {
    table_create_empty_filter,
    table_init_filter
} from "../../../../../../../../template/table/utility/table_init_filter";
import {SettingsService} from "../../../../../../../../service/settings";
import {Localized} from "../../../../../../../../domain_value/localized";
import {InstanceMap} from "../../../../../../../../domain_value/instance_map";
import {Difficulty} from "../../../../../../../../domain_value/difficulty";
import {DataService} from "../../../../../../../../service/data";

@Component({
    selector: "RecentRaids",
    templateUrl: "./recent_raids.html",
    styleUrls: ["./recent_raids.scss"]
})
export class RecentRaidsComponent implements OnInit, OnChanges {

    @Input() guild_name: string;
    @Input() server_id: number;

    header_columns: Array<HeaderColumn> = [
        {
            index: 0,
            filter_name: 'map_id',
            labelKey: "PvE.Search.raid",
            type: 3,
            type_range: [{value: -1, label_key: "PvE.Search.raid"}],
            col_type: 0
        },
        {
            index: 1,
            filter_name: 'map_difficulty',
            labelKey: "PvE.Search.difficulty",
            type: 3,
            type_range: [{value: -1, label_key: "PvE.Search.difficulty"}],
            col_type: 2
        },
        {index: 2, filter_name: 'start_ts', labelKey: "PvE.Search.start", type: 2, type_range: null, col_type: 1}
    ];
    body_columns: Array<Array<BodyColumn>> = [];
    clientSide: boolean = false;
    responsiveHeadColumns: Array<number> = [0, 1];
    responsiveModeWidthInPx: number = 1280;
    num_characters: number = 0;

    private last_filter;

    constructor(
        private recentRaidsService: RecentRaidsService,
        public dateService: DateService,
        private settingsService: SettingsService,
        private dataService: DataService
    ) {
        this.dataService.get_maps_by_type(0).subscribe((instance_maps: Array<Localized<InstanceMap>>) => {
            instance_maps.forEach(inner_map => this.header_columns[0].type_range.push({
                value: inner_map.base.id,
                label_key: inner_map.localization
            }));
        });
        this.dataService.difficulties.subscribe((difficulties: Array<Localized<Difficulty>>) => {
            difficulties.forEach(difficulty => this.header_columns[1].type_range.push({
                value: difficulty.base.id,
                label_key: difficulty.localization
            }));
        });
    }

    ngOnInit(): void {
        let filter;
        if (!this.settingsService.check("table_filter_guild_recent_raids_search")) {
            filter = table_init_filter(this.header_columns);
            filter.start_ts.sorting = false;
            this.settingsService.set("table_filter_guild_recent_raids_search", filter);
        } else {
            filter = this.settingsService.get("table_filter_guild_recent_raids_search");
        }
        filter["privacy"] = table_create_empty_filter();
        this.last_filter = filter;
        this.onFilter(filter);
    }

    ngOnChanges(changes: any): void {
        if (changes.guild_name !== this.guild_name || changes.server_id !== this.server_id) {
            this.onFilter(this.last_filter);
        }
    }

    onFilter(filter: any): void {
        if (!this.guild_name || !this.server_id)
            return;

        filter.guild = {filter: this.guild_name, sorting: null};
        filter.server_id = {filter: this.server_id, sorting: null};
        filter.end_ts = {filter: null, sorting: null};
        this.recentRaidsService.get_recent_raids(filter, (search_result) => {
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
                    type: 3,
                    content: item.map_difficulty.toString(),
                    args: null
                });
                body_columns.push({
                    type: 2,
                    content: item.start_ts.toFixed(0),
                    args: null
                });
                return {
                    color: '',
                    columns: body_columns
                };
            });
        }, () => {
        });
    }
}
