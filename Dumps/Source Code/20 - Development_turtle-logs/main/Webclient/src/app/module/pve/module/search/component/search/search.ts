import {Component, OnInit} from "@angular/core";
import {HeaderColumn} from "../../../../../../template/table/module/table_header/domain_value/header_column";
import {BodyColumn} from "../../../../../../template/table/module/table_body/domain_value/body_column";
import {DataService} from "../../../../../../service/data";
import {AvailableServer} from "../../../../../../domain_value/available_server";
import {Localized} from "../../../../../../domain_value/localized";
import {InstanceMap} from "../../../../../../domain_value/instance_map";
import {Difficulty} from "../../../../../../domain_value/difficulty";
import {RaidSearchService} from "../../service/raid_search";
import {table_create_empty_filter, table_init_filter} from "../../../../../../template/table/utility/table_init_filter";
import {SettingsService} from "../../../../../../service/settings";
import {DateService} from "../../../../../../service/date";
import {TinyUrlService} from "../../../../../tiny_url/service/tiny_url";
import {NotificationService} from "../../../../../../service/notification";
import {Severity} from "../../../../../../domain_value/severity";
import {Meta, Title} from "@angular/platform-browser";

@Component({
    selector: "Search",
    templateUrl: "./search.html",
    styleUrls: ["./search.scss"],
    providers: [
        RaidSearchService,
        TinyUrlService
    ]
})
export class SearchComponent implements OnInit {
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
        {index: 2, filter_name: 'guild', labelKey: "PvE.Search.guild", type: 0, type_range: null, col_type: 0},
        {
            index: 3,
            filter_name: 'server_id',
            labelKey: "PvE.Search.server",
            type: 3,
            type_range: [{value: -1, label_key: "PvE.Search.server"}],
            col_type: 0
        },
        {index: 4, filter_name: 'start_ts', labelKey: "PvE.Search.start", type: 2, type_range: null, col_type: 1},
        {index: 5, filter_name: 'end_ts', labelKey: "PvE.Search.end", type: 2, type_range: null, col_type: 1}
    ];

    body_columns: Array<Array<BodyColumn>> = [];
    clientSide: boolean = false;
    responsiveHeadColumns: Array<number> = [0, 2];
    responsiveModeWidthInPx: number = 1280;
    num_characters: number = 0;

    private available_servers: Array<AvailableServer> = [];
    private last_filter;

    constructor(
        private dataService: DataService,
        private searchService: RaidSearchService,
        private settingsService: SettingsService,
        public dateService: DateService,
        public tinyUrlService: TinyUrlService,
        private notificationService: NotificationService,
        private metaService: Meta,
        private titleService: Title
    ) {
        this.titleService.setTitle("LegacyPlayers - Raid search");
        this.metaService.updateTag({name: "description", content: "Search for raid logs submitted to Legacyplayers."});

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
        this.dataService.servers.subscribe((servers: Array<AvailableServer>) => {
            this.available_servers = servers;
            servers.forEach(server => this.header_columns[3].type_range.push({
                value: server.id,
                label_key: server.name + " (" + server.patch + ")"
            }));
        });
    }

    ngOnInit(): void {
        let filter;
        if (!this.settingsService.check("table_filter_raids_search")) {
            filter = table_init_filter(this.header_columns);
            filter.end_ts.sorting = false;
            this.settingsService.set("table_filter_raids_search", filter);
        } else {
            filter = this.settingsService.get("table_filter_raids_search");
        }
        filter["privacy"] = table_create_empty_filter();
        this.onFilter(filter);
    }

    onFilter(filter: any): void {
        const account_information = this.settingsService.get("ACCOUNT_INFORMATION");
        this.searchService.search_raids(filter, (search_result) => {
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
                        can_delete: item.can_delete || (!!account_information && (account_information.access_rights & 1) === 1)
                    }
                });
                body_columns.push({
                    type: 3,
                    content: item.map_difficulty.toString(),
                    args: null
                });
                body_columns.push({
                    type: 0,
                    content: item.guild ? item.guild.name : 'Pug Raid',
                    args: item.guild ? {
                        server_name: this.available_servers.find(server => server.id === item.server_id)?.name,
                        guild_name: item.guild.name
                    } : null
                });
                body_columns.push({
                    type: 3,
                    content: item.server_id.toString(),
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

    delete_raid(instance_meta_id: number): void {
        this.searchService.delete_raid(instance_meta_id, () => {
           this.onFilter(this.last_filter);
           this.notificationService.propagate(Severity.Success, "Raid deleted!");
        });
    }

}
