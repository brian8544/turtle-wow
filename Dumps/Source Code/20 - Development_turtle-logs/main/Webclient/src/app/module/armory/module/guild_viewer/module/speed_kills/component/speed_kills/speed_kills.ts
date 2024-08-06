import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import {HeaderColumn} from "../../../../../../../../template/table/module/table_header/domain_value/header_column";
import {DataService} from "../../../../../../../../service/data";
import {SettingsService} from "../../../../../../../../service/settings";
import {TinyUrlService} from "../../../../../../../tiny_url/service/tiny_url";
import {table_init_filter} from "../../../../../../../../template/table/utility/table_init_filter";
import {SpeedKillService} from "../../../../../../../pve/module/speed_kill/service/speed_kill";
import {SpeedKill} from "../../../../../../../pve/module/speed_kill/domain_value/speed_kill";
import {BodyRow} from "../../../../../../../../template/table/module/table_body/domain_value/body_row";
import {Subscription} from "rxjs";
import {DateService} from "../../../../../../../../service/date";
import {Router} from "@angular/router";
import {group_by} from "../../../../../../../../stdlib/group_by";
import {min_by} from "../../../../../../../../stdlib/min_by";
import {enumerate} from "../../../../../../../../stdlib/enumerate";

@Component({
    selector: "SpeedKills",
    templateUrl: "./speed_kills.html",
    styleUrls: ["./speed_kills.scss"]
})
export class SpeedKillsComponent implements OnInit, OnDestroy {

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
            filter_name: 'encounter',
            labelKey: "Armory.GuildViewer.SpeedKill.Encounter",
            type: 3,
            type_range: [{value: -1, label_key: "Armory.GuildViewer.SpeedKill.Encounter"}],
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
        private speedKillService: SpeedKillService,
        public dateService: DateService,
        private router: Router
    ) {
        this.subscriptions.add(this.dataService.encounters.subscribe(encounters => {
            encounters.forEach(encounter => {
                this.header_columns[1].type_range.push({value: encounter.base.id, label_key: encounter.localization});
            });
        }));
        this.subscriptions.add(this.dataService.difficulties.subscribe(difficulties => {
            difficulties.forEach(difficulty => {
                this.header_columns[2].type_range.push({value: difficulty.base.id, label_key: difficulty.localization});
            });
        }));
        this.subscriptions.add(this.speedKillService.all_speed_kills.subscribe(speed_kills => {
            const data = group_by(speed_kills.filter(speed_kill => speed_kill.server_id === this.server_id).sort((left, right) => left.duration - right.duration), (speed_kill) => speed_kill.encounter_id.toString() + "," + speed_kill.difficulty_id.toString());
            for (const group in data)
                data[group] = enumerate(data[group]).filter(([index, speed_kill]) => speed_kill.guild_id === this.guild_id);
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
        if (!this.settingsService.check("table_filter_guild_speed_kills_search")) {
            filter.rank.sorting = true;
            this.settingsService.set("table_filter_guild_speed_kills_search", filter);
        }
    }

    update(speed_kills: Array<[number, SpeedKill]>): void {
        this.body_columns = [];
        for (const [index, speed_kill] of speed_kills) {
            this.body_columns.push({
                color: "", columns: [
                    {
                        type: 1,
                        content: (index + 1).toString(),
                        args: null
                    },
                    {
                        type: 3,
                        content: speed_kill.encounter_id.toString(),
                        args: {
                            instance_meta_id: speed_kill.instance_meta_id,
                            attempt_id: speed_kill.attempt_id
                        }
                    },
                    {
                        type: 3,
                        content: speed_kill.difficulty_id.toString(),
                        args: null
                    },
                    {
                        type: 2,
                        content: speed_kill.duration,
                        args: null
                    }
                ]
            });
        }
    }

    ngOnDestroy(): void {
        this.subscriptions?.unsubscribe();
    }

    redirect_to_viewer(instance_meta_id: number, attempt_id: number): void {
        this.router.navigate(["/viewer/" + instance_meta_id.toString() + "/base"], {queryParams: {preselected_attempt_id: attempt_id}});
    }
}
