import {Component, OnDestroy, OnInit} from "@angular/core";
import {TinyUrl} from "../../../../../tiny_url/domain_value/tiny_url";
import {RankingUrl} from "../../../../../tiny_url/domain_value/ranking_url";
import {SettingsService} from "../../../../../../service/settings";
import {TinyUrlService} from "../../../../../tiny_url/service/tiny_url";
import {SelectOption} from "../../../../../../template/input/select_input/domain_value/select_option";
import {DataService} from "../../../../../../service/data";
import {Subscription} from "rxjs";
import {SpeedRunService} from "../../service/speed_run";
import {RaidMeterSubject} from "../../../../../../template/meter_graph/domain_value/raid_meter_subject";
import {DateService} from "../../../../../../service/date";
import {Router} from "@angular/router";
import {Meta, Title} from "@angular/platform-browser";

@Component({
    selector: "SpeedRun",
    templateUrl: "./speed_run.html",
    styleUrls: ["./speed_run.scss"],
    providers: [SpeedRunService]
})
export class SpeedRunComponent implements OnInit, OnDestroy {

    private subscriptions: Subscription;
    private finished_loading: [boolean, boolean, boolean] = [false, false, false];

    selections_current_selection: number = 1;
    selections: Array<SelectOption> = [
        {value: 1, label_key: "Overall"}
    ];

    maps_current_selection: number = 1;
    maps: Array<SelectOption> = [];

    servers_selected_items: Array<any> = [];
    servers: Array<any> = [];

    difficulties_selected_items: Array<any> = [];
    difficulties: Array<any> = [];

    seasons_selected_items: Array<any> = [];
    seasons: Array<any> = [];

    bar_subjects: Map<number, RaidMeterSubject> = new Map();
    bar_tooltips: Map<number, any> = new Map();
    bars: Array<[number, number | string]> = [];

    constructor(
        private settingsService: SettingsService,
        private tinyUrlService: TinyUrlService,
        private dataService: DataService,
        private speedRunService: SpeedRunService,
        public dateService: DateService,
        private routerService: Router,
        private metaService: Meta,
        private titleService: Title
    ) {
        this.titleService.setTitle("LegacyPlayers - Speed runs");
        this.metaService.updateTag({name: "description", content: "Seasonal speed runs of all guilds on Legacyplayers."});

        this.speedRunService.speed_runs.subscribe(speed_runs => {
            this.bars = [];
            for (const speed_run of speed_runs) {
                this.bar_tooltips.set(speed_run.instance_meta_id, {type: 3, guild_id: speed_run.guild_id});
                this.bar_subjects.set(speed_run.instance_meta_id, {
                    id: speed_run.guild_id,
                    name: speed_run.guild_name,
                    color_class: "hero_class_bg_1",
                    icon: "/assets/wow_icon/inv_misc_questionmark.jpg"
                } as RaidMeterSubject);
                this.bars.push([speed_run.instance_meta_id, speed_run.duration]);
            }
        });
    }

    ngOnInit(): void {
        this.seasons = this.dataService.ranking_seasons.map(item => {
            return {id: item.value, label: item.label_key};
        }).reverse();
        this.subscriptions = this.dataService.servers.subscribe(servers => {
            this.servers = servers.sort((left, right) => left.expansion_id - right.expansion_id)
                .map(server => {
                    return {id: server.id, label: server.name + " (" + server.patch + ")"};
                });
            this.finished_loading[0] = servers.length > 0;
            if (this.finished_loading.every(item => item)) this.init_ranking();
        });
        this.subscriptions.add(this.dataService.maps.subscribe(maps => {
            this.maps = maps.filter(map => map.base.map_type === 0).map(map => {
                return {value: map.base.id, label_key: map.localization};
            });
            this.finished_loading[1] = maps.length > 0;
            if (this.finished_loading.every(item => item)) this.init_ranking();
        }));
        this.subscriptions.add(this.dataService.difficulties.subscribe(difficulties => {
            this.difficulties = difficulties.sort((left, right) => left.base.id - right.base.id)
                .map(difficulty => {
                    return {id: difficulty.base.id, label: difficulty.localization};
                });
            this.finished_loading[2] = difficulties.length > 0;
            if (this.finished_loading.every(item => item)) this.init_ranking();
        }));
    }

    ngOnDestroy(): void {
        this.subscriptions?.unsubscribe();
    }

    bar_clicked(bar: [number, number]): void {
        this.routerService.navigate(["/viewer/" + bar[0].toString() + "/base"]);
    }

    select(): void {
        if (!this.finished_loading.every(item => item))
            return;

        // Slight delay, so the selected items are updated
        setTimeout(() => {
            const selection_params = [Number(this.selections_current_selection),
                Number(this.maps_current_selection), this.servers_selected_items.map(item => item.id),
                this.difficulties_selected_items.map(item => item.id),
                this.seasons_selected_items.map(item => item.id)];
            // @ts-ignore
            this.speedRunService.select(...selection_params);
            this.settingsService.set("pve_speed_run", selection_params);
        }, 250);
    }

    share(): void {
        const tiny_url = {
            type_id: 2,
            navigation_id: 10,
            payload: this.settingsService.get("pve_speed_run")
        } as TinyUrl<RankingUrl>;
        this.tinyUrlService.set_tiny_url(tiny_url);
    }

    bar_label_function(dateService: DateService, amount: number): string {
        return dateService.toTimeSpan(amount);
    }

    init_ranking(): void {
        if (this.settingsService.check("pve_speed_run")) {
            const selection_params = this.settingsService.get("pve_speed_run");
            this.selections_current_selection = selection_params[0];
            this.maps_current_selection = selection_params[1];
            this.servers_selected_items = this.servers.filter(item => selection_params[2].includes(item.id));
            this.difficulties_selected_items = this.difficulties.filter(item => selection_params[3].includes(item.id));
            this.seasons_selected_items = this.seasons.filter(item => selection_params[4].includes(item.id));
        }
        this.select();
    }
}
