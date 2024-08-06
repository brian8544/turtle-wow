import {Component, OnDestroy, OnInit} from "@angular/core";
import {RankingService} from "../../service/ranking";
import {RaidMeterSubject} from "../../../../../../template/meter_graph/domain_value/raid_meter_subject";
import {SelectOption} from "../../../../../../template/input/select_input/domain_value/select_option";
import {SettingsService} from "../../../../../../service/settings";
import {Subscription} from "rxjs";
import {DataService} from "../../../../../../service/data";
import {TinyUrlService} from "../../../../../tiny_url/service/tiny_url";
import {TinyUrl} from "../../../../../tiny_url/domain_value/tiny_url";
import {RankingUrl} from "../../../../../tiny_url/domain_value/ranking_url";
import {AdditionalButton} from "../../../../../../template/input/multi_select/domain_value/additional_button";
import {Meta, Title} from "@angular/platform-browser";

@Component({
    selector: "Ranking",
    templateUrl: "./ranking.html",
    styleUrls: ["./ranking.scss"],
    providers: [
        RankingService,
        TinyUrlService
    ]
})
export class RankingComponent implements OnInit, OnDestroy {

    private subscription: Subscription = new Subscription();

    bar_subjects: Map<number, RaidMeterSubject> = new Map();
    bar_tooltips: Map<number, any> = new Map();
    bar_meta_information: Map<number, any> = new Map();
    bars: Array<[number, number | string]> = [];

    modes_current_selection: number = 1;
    modes: Array<SelectOption> = [
        {value: 1, label_key: "Damage per second"},
        {value: 2, label_key: "Effective heal per second"},
        {value: 3, label_key: "Threat per second"},
    ];

    selections_current_selection: number = 1;
    selections: Array<SelectOption> = [
        {value: 1, label_key: "Overall"}
    ];

    encounters_selected_items: Array<any> = [];
    encounters: Array<any> = [];
    encounter_name_map: Map<number, string> = new Map();

    classes_selected_items: Array<any> = [];
    classes: Array<any> = [];

    servers_selected_items: Array<any> = [];
    servers: Array<any> = [];

    difficulties_selected_items: Array<any> = [];
    difficulties: Array<any> = [];

    seasons_selected_items: Array<any> = [];
    seasons: Array<any> = [];

    additional_encounter_button: AdditionalButton[] = [
        {
            id: -1,
            label: "Molten Core",
            list_selection_callback: (button, selected_list, current_list, checked) =>
                this.uncheck_if_all_check_else([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], selected_list, current_list)
        },
        {
            id: -2,
            label: "Zul'Gurub",
            list_selection_callback: (button, selected_list, current_list, checked) =>
                this.uncheck_if_all_check_else([12, 13, 14, 15, 16, 17, 18, 19, 20, 21], selected_list, current_list)
        },
        {
            id: -3,
            label: "Blackwing Lair",
            list_selection_callback: (button, selected_list, current_list, checked) =>
                this.uncheck_if_all_check_else([22, 23, 24, 25, 26, 27, 28, 29], selected_list, current_list)
        },
        {
            id: -4,
            label: "Ruins of Ahn'Qiraj",
            list_selection_callback: (button, selected_list, current_list, checked) =>
                this.uncheck_if_all_check_else([30, 31, 32, 33, 34, 35], selected_list, current_list)
        },
        {
            id: -5,
            label: "Temple of Ahn'Qiraj",
            list_selection_callback: (button, selected_list, current_list, checked) =>
                this.uncheck_if_all_check_else([36, 37, 38, 39, 40, 41, 42, 163, 164, 165], selected_list, current_list)
        },
        {
            id: -6,
            label: "Naxxramas - All",
            list_selection_callback: (button, selected_list, current_list, checked) =>
                this.uncheck_if_all_check_else([43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57], selected_list, current_list)
        },
        {
            id: -7,
            label: "Naxxramas - Abomination Wing",
            list_selection_callback: (button, selected_list, current_list, checked) =>
                this.uncheck_if_all_check_else([43, 44, 45, 46], selected_list, current_list)
        },
        {
            id: -8,
            label: "Naxxramas - Plague Wing",
            list_selection_callback: (button, selected_list, current_list, checked) =>
                this.uncheck_if_all_check_else([47, 48, 49], selected_list, current_list)
        },
        {
            id: -9,
            label: "Naxxramas - Spider Wing",
            list_selection_callback: (button, selected_list, current_list, checked) =>
                this.uncheck_if_all_check_else([50, 51, 52], selected_list, current_list)
        },
        {
            id: -10,
            label: "Naxxramas - Deathknight Wing",
            list_selection_callback: (button, selected_list, current_list, checked) =>
                this.uncheck_if_all_check_else([53, 54, 55], selected_list, current_list)
        },
        {
            id: -11,
            label: "Naxxramas - Frostwyrm Lair",
            list_selection_callback: (button, selected_list, current_list, checked) =>
                this.uncheck_if_all_check_else([56, 57], selected_list, current_list)
        },
        {
            id: -12,
            label: "Karazhan",
            list_selection_callback: (button, selected_list, current_list, checked) =>
                this.uncheck_if_all_check_else([58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68], selected_list, current_list)
        },
        {
            id: -13,
            label: "Gruul's Lair",
            list_selection_callback: (button, selected_list, current_list, checked) =>
                this.uncheck_if_all_check_else([69, 70], selected_list, current_list)
        },
        {
            id: -14,
            label: "Tempest Keep",
            list_selection_callback: (button, selected_list, current_list, checked) =>
                this.uncheck_if_all_check_else([72, 73, 74, 75], selected_list, current_list)
        },
        {
            id: -15,
            label: "Serpentshrine Cavern",
            list_selection_callback: (button, selected_list, current_list, checked) =>
                this.uncheck_if_all_check_else([76, 77, 78, 79, 80, 81], selected_list, current_list)
        },
        {
            id: -16,
            label: "Zul'Aman",
            list_selection_callback: (button, selected_list, current_list, checked) =>
                this.uncheck_if_all_check_else([82, 83, 84, 85, 86, 87], selected_list, current_list)
        },
        {
            id: -17,
            label: "Battle for Mount Hyjal",
            list_selection_callback: (button, selected_list, current_list, checked) =>
                this.uncheck_if_all_check_else([88, 89, 90, 91, 92], selected_list, current_list)
        },
        {
            id: -18,
            label: "Black Temple",
            list_selection_callback: (button, selected_list, current_list, checked) =>
                this.uncheck_if_all_check_else([93, 94, 95, 96, 97, 98, 99, 100, 101], selected_list, current_list)
        },
        {
            id: -19,
            label: "The Sunwell",
            list_selection_callback: (button, selected_list, current_list, checked) =>
                this.uncheck_if_all_check_else([102, 103, 104, 105, 106, 107], selected_list, current_list)
        },
        {
            id: -20,
            label: "Vault of Archavon",
            list_selection_callback: (button, selected_list, current_list, checked) =>
                this.uncheck_if_all_check_else([110, 111, 112, 113], selected_list, current_list)
        },
        {
            id: -21,
            label: "Ulduar NM",
            list_selection_callback: (button, selected_list, current_list, checked) =>
                this.uncheck_if_all_check_else([114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 146, 147, 148, 152, 153, 158, 159], selected_list, current_list)
        },
        {
            id: -22,
            label: "Ulduar HM",
            list_selection_callback: (button, selected_list, current_list, checked) =>
                this.uncheck_if_all_check_else([127, 149, 150, 151, 154, 155, 156, 157, 160, 161, 162], selected_list, current_list)
        },
        {
            id: -23,
            label: "Trial of the Crusader",
            list_selection_callback: (button, selected_list, current_list, checked) =>
                this.uncheck_if_all_check_else([128, 129, 130, 131, 132], selected_list, current_list)
        },
        {
            id: -24,
            label: "Icecrown Citadel - All",
            list_selection_callback: (button, selected_list, current_list, checked) =>
                this.uncheck_if_all_check_else([133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144], selected_list, current_list)
        },
        {
            id: -25,
            label: "Icecrown Citadel - Lower Spire",
            list_selection_callback: (button, selected_list, current_list, checked) =>
                this.uncheck_if_all_check_else([133, 134, 135, 136], selected_list, current_list)
        },
        {
            id: -26,
            label: "Icecrown Citadel - Plagueworks",
            list_selection_callback: (button, selected_list, current_list, checked) =>
                this.uncheck_if_all_check_else([137, 138, 139], selected_list, current_list)
        },
        {
            id: -27,
            label: "Icecrown Citadel - Crimson Hall",
            list_selection_callback: (button, selected_list, current_list, checked) =>
                this.uncheck_if_all_check_else([140, 141], selected_list, current_list)
        },
        {
            id: -27,
            label: "Icecrown Citadel - Frostwing Halls",
            list_selection_callback: (button, selected_list, current_list, checked) =>
                this.uncheck_if_all_check_else([142, 143], selected_list, current_list)
        }
    ];
    additional_spec_buttons: AdditionalButton[] = [
        {
            id: -1,
            label: "Warrior",
            list_selection_callback: (button, selected_list, current_list, checked) =>
                this.uncheck_if_all_check_else([1, 2, 3, 4], selected_list, current_list)
        },
        {
            id: -2,
            label: "Paladin",
            list_selection_callback: (button, selected_list, current_list, checked) =>
                this.uncheck_if_all_check_else([5, 6, 7, 8], selected_list, current_list)
        },
        {
            id: -3,
            label: "Hunter",
            list_selection_callback: (button, selected_list, current_list, checked) =>
                this.uncheck_if_all_check_else([9, 10, 11, 12], selected_list, current_list)
        },
        {
            id: -4,
            label: "Rogue",
            list_selection_callback: (button, selected_list, current_list, checked) =>
                this.uncheck_if_all_check_else([13, 14, 15, 16], selected_list, current_list)
        },
        {
            id: -5,
            label: "Priest",
            list_selection_callback: (button, selected_list, current_list, checked) =>
                this.uncheck_if_all_check_else([17, 18, 19, 20], selected_list, current_list)
        },
        {
            id: -6,
            label: "Death knight",
            list_selection_callback: (button, selected_list, current_list, checked) =>
                this.uncheck_if_all_check_else([21, 22, 23, 24], selected_list, current_list)
        },
        {
            id: -7,
            label: "Shaman",
            list_selection_callback: (button, selected_list, current_list, checked) =>
                this.uncheck_if_all_check_else([25, 26, 27, 28], selected_list, current_list)
        },
        {
            id: -8,
            label: "Mage",
            list_selection_callback: (button, selected_list, current_list, checked) =>
                this.uncheck_if_all_check_else([29, 30, 31, 32], selected_list, current_list)
        },
        {
            id: -9,
            label: "Warlock",
            list_selection_callback: (button, selected_list, current_list, checked) =>
                this.uncheck_if_all_check_else([33, 34, 35, 36], selected_list, current_list)
        },
        {
            id: -11,
            label: "Druid",
            list_selection_callback: (button, selected_list, current_list, checked) =>
                this.uncheck_if_all_check_else([37, 38, 39, 40], selected_list, current_list)
        },
    ];

    private finished_loading: [boolean, boolean, boolean] = [false, false, false];

    constructor(
        private settingsService: SettingsService,
        private rankingService: RankingService,
        private dataService: DataService,
        private tinyUrlService: TinyUrlService,
        private metaService: Meta,
        private titleService: Title
    ) {
        this.titleService.setTitle("LegacyPlayers - Ranking");
        this.metaService.updateTag({
            name: "description",
            content: "Seasonal damage, heal and threat rankings of all players on Legacyplayers."
        });

        this.subscription.add(this.rankingService.rankings.subscribe(entries => {
            for (const row of entries) {
                this.bar_subjects.set(row.character_id, {
                    color_class: "hero_class_bg_" + row.character_meta.hero_class_id.toString(),
                    icon: "/assets/wow_hero_classes/c" + row.character_meta.hero_class_id.toString() + "-" + row.spec_ids[0].toString() + ".png",
                    id: row.character_id,
                    name: row.character_meta.name
                });
                this.bar_tooltips.set(row.character_id, {
                    type: 18,
                    stay_static: true,
                    instance_meta_ids: row.instance_meta_ids,
                    attempt_ids: row.attempt_ids,
                    encounter_names: row.encounter_ids.map(id => this.encounter_name_map.get(id)),
                    amounts: row.amounts,
                    durations: row.durations,
                });
                this.bar_meta_information.set(row.character_id, [row.instance_meta_ids, row.attempt_ids]);
            }
            this.bars = entries.map(row => [row.character_id, row.amount]);
        }));
    }

    ngOnInit(): void {
        this.seasons = this.dataService.ranking_seasons.map(item => {
            return {id: item.value, label: item.label_key};
        }).reverse();
        this.classes = this.dataService.specs.map(item => {
            return {id: item.value, label: item.label_key};
        });
        this.subscription.add(this.dataService.difficulties.subscribe(difficulties => {
            this.difficulties = difficulties.sort((left, right) => left.base.id - right.base.id)
                .map(difficulty => {
                    return {id: difficulty.base.id, label: difficulty.localization};
                });
            this.finished_loading[0] = difficulties.length > 0;
            if (this.finished_loading.every(item => item)) this.init_ranking();
        }));
        this.subscription.add(this.dataService.servers.subscribe(servers => {
            this.servers = servers.sort((left, right) => left.expansion_id - right.expansion_id)
                .map(server => {
                    return {id: server.id, label: server.name + " (" + server.patch + ")"};
                });
            this.finished_loading[1] = servers.length > 0;
            if (this.finished_loading.every(item => item)) this.init_ranking();
        }));
        this.subscription.add(this.dataService.encounters.subscribe(encounters => {
            this.encounters = encounters.map(encounter => {
                this.encounter_name_map.set(encounter.base.id, encounter.localization);
                return {id: encounter.base.id, label: encounter.localization};
            });
            this.finished_loading[2] = encounters.length > 0;
            if (this.finished_loading.every(item => item)) this.init_ranking();
        }));
    }

    private init_ranking(): void {
        if (this.settingsService.check("pve_ranking")) {
            const selection_params = this.settingsService.get("pve_ranking");
            this.modes_current_selection = selection_params[0];
            this.selections_current_selection = selection_params[1];
            this.encounters_selected_items = this.encounters.filter(item => selection_params[2].includes(item.id));
            this.classes_selected_items = this.classes.filter(item => selection_params[3].includes(item.id));
            this.servers_selected_items = this.servers.filter(item => selection_params[4].includes(item.id));
            this.difficulties_selected_items = this.difficulties.filter(item => selection_params[5].includes(item.id));
            this.seasons_selected_items = this.seasons.filter(item => selection_params[6].includes(item.id));
        }
        this.select();
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }

    bar_clicked(bar: [number, number]): void {
        //this.routerService.navigate(["/viewer/" + this.bar_meta_information.get(bar[0])[0][0].toString() + "/base"]);
    }

    select(): void {
        if (!this.finished_loading.every(item => item))
            return;

        // Slight delay, so the selected items are updated
        setTimeout(() => {
            const selection_params = [this.modes_current_selection, this.selections_current_selection,
                this.encounters_selected_items.map(item => item.id),
                this.classes_selected_items.map(item => item.id),
                this.servers_selected_items.map(item => item.id),
                this.difficulties_selected_items.map(item => item.id),
                this.seasons_selected_items.map(item => item.id)];
            // @ts-ignore
            this.rankingService.select(...selection_params);
            this.settingsService.set("pve_ranking", selection_params);
        }, 250);
    }

    share(): void {
        const tiny_url = {
            type_id: 2,
            navigation_id: 8,
            payload: this.settingsService.get("pve_ranking")
        } as TinyUrl<RankingUrl>;
        this.tinyUrlService.set_tiny_url(tiny_url);
    }

    uncheck_if_all_check_else(wanted_ids: number[], selected_list: any[], current_list: any[]): any[] {
        const all_selected = !wanted_ids.some(id => selected_list.find(item => item.id === id) === undefined);
        if (all_selected) {
            // Return all selected but the wanted_ids
            return selected_list.filter(item => !wanted_ids.includes(item.id));
        }
        return current_list.filter(item => wanted_ids.includes(item.id) || selected_list.find(i_item => i_item.id === item.id));
    }

    delete_clicked(character_id: number): void {
        this.rankingService.delete(this.bar_meta_information.get(character_id)[1][0]);
    }

    get is_deletable(): boolean {
        const account_information = this.settingsService.get("ACCOUNT_INFORMATION");
        return this.selections_current_selection === 1 && this.encounters_selected_items.length === 1 && (!!account_information && (account_information.access_rights & 1) === 1);
    }
}
