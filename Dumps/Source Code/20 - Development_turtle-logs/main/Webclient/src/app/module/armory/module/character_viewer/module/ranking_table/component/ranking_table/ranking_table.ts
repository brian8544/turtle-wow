import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import {HeaderColumn} from "../../../../../../../../template/table/module/table_header/domain_value/header_column";
import {BodyColumn} from "../../../../../../../../template/table/module/table_body/domain_value/body_column";
import {RankingTableService} from "../../service/ranking_table";
import {Subscription} from "rxjs";
import {TinyUrlService} from "../../../../../../../tiny_url/service/tiny_url";
import {DataService} from "../../../../../../../../service/data";
import {Router} from "@angular/router";

@Component({
    selector: "RankingTable",
    templateUrl: "./ranking_table.html",
    styleUrls: ["./ranking_table.scss"],
    providers: [
        RankingTableService,
        TinyUrlService
    ]
})
export class RankingTableComponent implements OnDestroy, OnInit {

    private subscription: Subscription = new Subscription();

    header_columns: Array<HeaderColumn> = [
        {
            index: 0,
            filter_name: 'npc_id',
            labelKey: "Armory.Viewer.RankingTable.boss_name",
            type: 3,
            type_range: [{value: -1, label_key: "Armory.Viewer.RankingTable.boss_name"}],
            col_type: 0
        },
        {
            index: 1,
            filter_name: 'difficulty_id',
            labelKey: "Armory.GuildViewer.SpeedKill.Difficulty",
            type: 3,
            type_range: [{value: -1, label_key: "Armory.GuildViewer.SpeedKill.Difficulty"}],
            col_type: 2
        },
        {
            index: 2,
            filter_name: 'dps',
            labelKey: "Armory.Viewer.RankingTable.dps",
            type: 0,
            type_range: null,
            col_type: 2
        },
        {
            index: 3,
            filter_name: 'hps',
            labelKey: "Armory.Viewer.RankingTable.hps",
            type: 0,
            type_range: null,
            col_type: 2
        },
        {
            index: 4,
            filter_name: 'tps',
            labelKey: "Armory.Viewer.RankingTable.tps",
            type: 0,
            type_range: null,
            col_type: 2
        }
    ];
    body_columns: Array<Array<BodyColumn>> = [];
    clientSide: boolean = true;
    responsiveHeadColumns: Array<number> = [0, 1, 2];
    responsiveModeWidthInPx: number = 600;
    num_characters: number = 0;

    @Input() character_id: number;
    @Input() server_id: number;

    constructor(
        private rankingTableService: RankingTableService,
        public tinyUrlService: TinyUrlService,
        private dataService: DataService,
        private router: Router
    ) {
        this.subscription.add(this.dataService.encounters.subscribe(encounters => {
            encounters.forEach(encounter => {
                this.header_columns[0].type_range.push({
                    value: encounter.base.id,
                    label_key: encounter.localization
                });
            });
        }));
        this.subscription.add(this.dataService.difficulties.subscribe(difficulties => {
            difficulties.forEach(difficulty => {
                this.header_columns[1].type_range.push({
                    value: difficulty.base.id,
                    label_key: difficulty.localization
                });
            });
        }));
        this.subscription.add(this.rankingTableService.rows.subscribe(rows => this.body_columns = rows));
    }

    ngOnInit(): void {
        this.rankingTableService.set_current_meta(this.character_id, this.server_id);
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }

    get url_suffix(): string {
        return window.location.href.replace(window.location.origin + "/armory/character/", "");
    }

    navigate_to_raid(instance_meta_id: number, attempt_id: number): void {
        this.router.navigate(["/viewer/" + instance_meta_id.toString() + "/base"], {queryParams: {preselected_attempt_id: attempt_id}});
    }

}
