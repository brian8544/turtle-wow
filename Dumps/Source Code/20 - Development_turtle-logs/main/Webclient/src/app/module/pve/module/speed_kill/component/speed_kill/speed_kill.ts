import {Component, OnDestroy, OnInit} from "@angular/core";
import {SpeedKillService} from "../../service/speed_kill";
import {Subscription} from "rxjs";
import {SelectOption} from "../../../../../../template/input/select_input/domain_value/select_option";
import {RaidMeterSubject} from "../../../../../../template/meter_graph/domain_value/raid_meter_subject";
import {SettingsService} from "../../../../../../service/settings";
import {TinyUrlService} from "../../../../../tiny_url/service/tiny_url";
import {DataService} from "../../../../../../service/data";
import {DateService} from "../../../../../../service/date";
import {TinyUrl} from "../../../../../tiny_url/domain_value/tiny_url";
import {RankingUrl} from "../../../../../tiny_url/domain_value/ranking_url";
import {Router} from "@angular/router";
import {SpeedKill} from "../../domain_value/speed_kill";
import {Meta, Title} from "@angular/platform-browser";

@Component({
    selector: "SpeedKill",
    templateUrl: "./speed_kill.html",
    styleUrls: ["./speed_kill.scss"],
    providers: [SpeedKillService]
})
export class SpeedKillComponent implements OnInit, OnDestroy {

    private subscriptions: Subscription;
    private finished_loading: [boolean, boolean, boolean] = [false, false, false];

    selections_current_selection: number = 1;
    selections: Array<SelectOption> = [
        {value: 1, label_key: "Overall"}
    ];

    encounters_current_selection: number = 1;
    encounters: Array<SelectOption> = [];

    servers_selected_items: Array<any> = [];
    servers: Array<any> = [];

    difficulties_selected_items: Array<any> = [];
    difficulties: Array<any> = [];

    seasons_selected_items: Array<any> = [];
    seasons: Array<any> = [];

    bar_meta: Map<number, SpeedKill> = new Map();
    bar_subjects: Map<number, RaidMeterSubject> = new Map();
    bar_tooltips: Map<number, any> = new Map();
    bars: Array<[number, number | string]> = [];

    constructor(
        private settingsService: SettingsService,
        private tinyUrlService: TinyUrlService,
        private dataService: DataService,
        private speedKillService: SpeedKillService,
        public dateService: DateService,
        private routerService: Router,
        private metaService: Meta,
        private titleService: Title
    ) {
        this.titleService.setTitle("LegacyPlayers - Speed kills");
        this.metaService.updateTag({name: "description", content: "Seasonal speed kills of all guilds on Legacyplayers."});

        this.speedKillService.speed_kills.subscribe(speed_kills => {
            this.bars = [];
            for (const speed_kill of speed_kills) {
                this.bar_tooltips.set(speed_kill.instance_meta_id, {type: 3, guild_id: speed_kill.guild_id});
                this.bar_subjects.set(speed_kill.instance_meta_id, {
                    id: speed_kill.guild_id, name: speed_kill.guild_name,
                    color_class: "hero_class_bg_1", icon: "/assets/wow_icon/inv_misc_questionmark.jpg"
                } as RaidMeterSubject);
                this.bar_meta.set(speed_kill.instance_meta_id, speed_kill);
                this.bars.push([speed_kill.instance_meta_id, speed_kill.duration]);
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
        this.subscriptions.add(this.dataService.encounters.subscribe(encounters => {
            this.encounters = encounters.sort((left, right) => left.base.map_id - right.base.map_id)
                .map(encounter => {
                    return {value: encounter.base.id, label_key: encounter.localization};
                });
            this.finished_loading[1] = encounters.length > 0;
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
        this.routerService.navigate(["/viewer/" + bar[0].toString() + "/base"], {queryParams: {preselected_attempt_id: this.bar_meta.get(bar[0]).attempt_id}});
    }

    select(): void {
        if (!this.finished_loading.every(item => item))
            return;

        // Slight delay, so the selected items are updated
        setTimeout(() => {
            const selection_params = [Number(this.selections_current_selection),
                Number(this.encounters_current_selection),
                this.servers_selected_items.map(item => item.id),
                this.difficulties_selected_items.map(item => item.id),
                this.seasons_selected_items.map(item => item.id)];
            // @ts-ignore
            this.speedKillService.select(...selection_params);
            this.settingsService.set("pve_speed_kill", selection_params);
        }, 250);
    }

    share(): void {
        const tiny_url = {
            type_id: 2,
            navigation_id: 11,
            payload: this.settingsService.get("pve_speed_kill")
        } as TinyUrl<RankingUrl>;
        this.tinyUrlService.set_tiny_url(tiny_url);
    }

    bar_label_function(dateService: DateService, amount: number): string {
        return dateService.toTimeSpan(amount);
    }

    init_ranking(): void {
        if (this.settingsService.check("pve_speed_kill")) {
            const selection_params = this.settingsService.get("pve_speed_kill");
            this.selections_current_selection = selection_params[0];
            this.encounters_current_selection = selection_params[1];
            this.servers_selected_items = this.servers.filter(item => selection_params[2].includes(item.id));
            this.difficulties_selected_items = this.difficulties.filter(item => selection_params[3].includes(item.id));
            this.seasons_selected_items = this.seasons.filter(item => selection_params[4].includes(item.id));
        }
        this.select();
    }

    delete_clicked(instance_meta_id: number): void {
        this.speedKillService.delete(this.bar_meta.get(instance_meta_id).attempt_id);
    }

    get is_deletable(): boolean {
        const account_information = this.settingsService.get("ACCOUNT_INFORMATION");
        return this.selections_current_selection === 1 && (!!account_information && (account_information.access_rights & 1) === 1);
    }

}
