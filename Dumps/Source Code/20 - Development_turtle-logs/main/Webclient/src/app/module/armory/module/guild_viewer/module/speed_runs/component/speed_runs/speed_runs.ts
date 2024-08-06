import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import {HeaderColumn} from "../../../../../../../../template/table/module/table_header/domain_value/header_column";
import {DataService} from "../../../../../../../../service/data";
import {SettingsService} from "../../../../../../../../service/settings";
import {TinyUrlService} from "../../../../../../../tiny_url/service/tiny_url";
import {table_init_filter} from "../../../../../../../../template/table/utility/table_init_filter";
import {BodyRow} from "../../../../../../../../template/table/module/table_body/domain_value/body_row";
import {Subscription} from "rxjs";
import {DateService} from "../../../../../../../../service/date";
import {Router} from "@angular/router";
import {group_by} from "../../../../../../../../stdlib/group_by";
import {min_by} from "../../../../../../../../stdlib/min_by";
import {enumerate} from "../../../../../../../../stdlib/enumerate";
import {Localized} from "../../../../../../../../domain_value/localized";
import {InstanceMap} from "../../../../../../../../domain_value/instance_map";
import {SpeedRunService} from "../../../../../../../pve/module/speed_run/service/speed_run";
import {SpeedRun} from "../../../../../../../pve/module/speed_run/domain_value/speed_run";

@Component({
    selector: "SpeedRuns",
    templateUrl: "./speed_runs.html",
    styleUrls: ["./speed_runs.scss"]
})
export class SpeedRunsComponent implements OnInit, OnDestroy {

    private subscriptions: Subscription = new Subscription();

    @Input() guild_id: number;
    @Input() server_id: number;

    header_columns: Array<HeaderColumn> = [
        {
            index: 0,
            filter_name: 'rank',
            labelKey: "Armory.GuildViewer.SpeedKill.Rank",
            type: 1,
            type_range: null,
            col_type: 3
        },
        {
            index: 1,
            filter_name: 'map_id',
            labelKey: "PvE.Search.raid",
            type: 3,
            type_range: [{value: -1, label_key: "PvE.Search.raid"}],
            col_type: 0
        },
        {
            index: 2,
            filter_name: 'difficulty',
            labelKey: "Armory.GuildViewer.SpeedKill.Difficulty",
            type: 3,
            type_range: [{value: -1, label_key: "Armory.GuildViewer.SpeedKill.Difficulty"}],
            col_type: 3
        },
        {
            index: 3,
            filter_name: 'duration',
            labelKey: "Armory.GuildViewer.SpeedKill.Duration",
            type: 1,
            type_range: null,
            col_type: 3
        },
    ];
    clientSide: boolean = true;
    responsiveHeadColumns: Array<number> = [0, 1];
    responsiveModeWidthInPx: number = 600;
    body_columns: Array<BodyRow> = [];
    total_num: number = 0;

    constructor(
        private dataService: DataService,
        private settingsService: SettingsService,
        public tinyUrlService: TinyUrlService,
        private speedRunService: SpeedRunService,
        public dateService: DateService,
        private router: Router
    ) {
        this.subscriptions.add(this.dataService.get_maps_by_type(0).subscribe((instance_maps: Array<Localized<InstanceMap>>) => {
            instance_maps.forEach(inner_map => this.header_columns[1].type_range.push({
                value: inner_map.base.id,
                label_key: inner_map.localization
            }));
        }));
        this.subscriptions.add(this.dataService.difficulties.subscribe(difficulties => {
            difficulties.forEach(difficulty => {
                this.header_columns[2].type_range.push({value: difficulty.base.id, label_key: difficulty.localization});
            });
        }));
        this.subscriptions.add(this.speedRunService.all_speed_runs.subscribe(speed_runs => {
            const data = group_by(speed_runs.filter(speed_run => speed_run.server_id === this.server_id).sort((left, right) => left.duration - right.duration), (speed_run) => speed_run.map_id.toString() + "," + speed_run.difficulty_id.toString());
            for (const group in data)
                data[group] = enumerate(data[group]).filter(([index, speed_run]) => speed_run.guild_id === this.guild_id);
            const result = [];
            for (const group in data) {
                if (data[group].length > 0) {
                    result.push(min_by(data[group], ([index, entry]) => entry.duration));
                }
            }
            this.update(result);
        }));
    }

    ngOnInit(): void {
        const filter = table_init_filter(this.header_columns);
        if (!this.settingsService.check("table_filter_guild_speed_runs_search")) {
            filter.rank.sorting = true;
            this.settingsService.set("table_filter_guild_speed_runs_search", filter);
        }
    }

    update(speed_runs: Array<[number, SpeedRun]>): void {
        this.body_columns = [];
        for (const [index, speed_run] of speed_runs) {
            this.body_columns.push({
                color: "", columns: [
                    {
                        type: 1,
                        content: (index + 1).toString(),
                        args: null
                    },
                    {
                        type: 3,
                        content: speed_run.map_id.toString(),
                        args: {
                            instance_meta_id: speed_run.instance_meta_id
                        }
                    },
                    {
                        type: 3,
                        content: speed_run.difficulty_id.toString(),
                        args: null
                    },
                    {
                        type: 2,
                        content: speed_run.duration,
                        args: null
                    }
                ]
            });
        }
    }

    ngOnDestroy(): void {
        this.subscriptions?.unsubscribe();
    }

    redirect_to_viewer(instance_meta_id: number): void {
        this.router.navigate(["/viewer/" + instance_meta_id.toString() + "/base"]);
    }
}
