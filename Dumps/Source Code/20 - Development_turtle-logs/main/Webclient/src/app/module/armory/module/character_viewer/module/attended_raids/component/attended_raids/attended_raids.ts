import {Component, Input, OnInit} from "@angular/core";
import {HeaderColumn} from "../../../../../../../../template/table/module/table_header/domain_value/header_column";
import {BodyColumn} from "../../../../../../../../template/table/module/table_body/domain_value/body_column";
import {TinyUrlService} from "../../../../../../../tiny_url/service/tiny_url";
import {DateService} from "../../../../../../../../service/date";
import {SettingsService} from "../../../../../../../../service/settings";
import {DataService} from "../../../../../../../../service/data";
import {Localized} from "../../../../../../../../domain_value/localized";
import {InstanceMap} from "../../../../../../../../domain_value/instance_map";
import {
    table_create_empty_filter,
    table_init_filter
} from "../../../../../../../../template/table/utility/table_init_filter";
import {Difficulty} from "../../../../../../../../domain_value/difficulty";
import {AttendedRaidsService} from "../../service/attended_raids";

@Component({
    selector: "AttendedRaids",
    templateUrl: "./attended_raids.html",
    styleUrls: ["./attended_raids.scss"]
})
export class AttendedRaidsComponent implements OnInit {

    @Input() character_id: number;

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
        {index: 2, filter_name: 'start_ts', labelKey: "PvE.Search.start", type: 2, type_range: null, col_type: 1},
        {index: 3, filter_name: 'end_ts', labelKey: "PvE.Search.end", type: 2, type_range: null, col_type: 1}
    ];

    body_columns: Array<Array<BodyColumn>> = [];
    clientSide: boolean = false;
    responsiveHeadColumns: Array<number> = [0, 1];
    responsiveModeWidthInPx: number = 600;
    num_characters: number = 0;

    private last_filter;

    constructor(
        public tinyUrlService: TinyUrlService,
        public dateService: DateService,
        private settingsService: SettingsService,
        private dataService: DataService,
        private attendedRaidsService: AttendedRaidsService
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
        if (!this.settingsService.check("table_filter_armory_raids_search")) {
            filter = table_init_filter(this.header_columns);
            filter.end_ts.sorting = false;
            this.settingsService.set("table_filter_armory_raids_search", filter);
        } else {
            filter = this.settingsService.get("table_filter_armory_raids_search");
        }
        filter["privacy"] = table_create_empty_filter();
        this.last_filter = filter;
        this.onFilter(filter);
    }

    onFilter(filter: any): void {
        filter.guild = {filter: null, sorting: null};
        filter.server_id = {filter: null, sorting: null};
        this.attendedRaidsService.search_raids(filter, this.character_id, (search_result) => {
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
                body_columns.push({
                    type: 2,
                    content: item.end_ts ? item.end_ts.toFixed(0) : '',
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
