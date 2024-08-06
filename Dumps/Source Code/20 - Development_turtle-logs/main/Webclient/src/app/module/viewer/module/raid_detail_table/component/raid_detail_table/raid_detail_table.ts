import {Component, OnDestroy} from "@angular/core";
import {RaidDetailService} from "../../service/raid_detail";
import {Subscription} from "rxjs";
import {SelectOption} from "../../../../../../template/input/select_input/domain_value/select_option";
import {HitType} from "../../../../domain_value/hit_type";
import {DetailRow} from "../../domain_value/detail_row";
import {ActivatedRoute, Router} from "@angular/router";
import {DetailDamageService} from "../../service/detail_damage";
import {DetailHealService} from "../../service/detail_heal";
import {DetailThreatService} from "../../service/detail_threat";
import {DetailAbsorbService} from "../../service/detail_absorb";
import {DetailHealAndAbsorbService} from "../../service/detail_heal_and_absorb";
import {KnechtUpdates} from "../../../../domain_value/knecht_updates";
import {InstanceDataService} from "../../../../service/instance_data";
import {merge_detail_rows} from "../../stdlib/util";

@Component({
    selector: "RaidDetailTable",
    templateUrl: "./raid_detail_table.html",
    styleUrls: ["./raid_detail_table.scss"],
    providers: [
        DetailDamageService,
        DetailHealService,
        DetailThreatService,
        DetailAbsorbService,
        DetailHealAndAbsorbService,
        RaidDetailService
    ]
})
export class RaidDetailTableComponent implements OnDestroy {

    private subscription: Subscription;
    private subscription_abilities: Subscription;
    private subscription_ability_details: Subscription;

    private ability_details: Array<[number, Array<[number, Array<[HitType, DetailRow]>]>]> = [];
    abilities: Array<SelectOption> = [];

    current_meter_selection: number = 1;
    current_ability_selection: number = 0;

    options: Array<SelectOption> = [
        {value: 1, label_key: 'Damage done'},
        {value: 2, label_key: 'Damage taken'},
        {value: 3, label_key: 'Total healing done'},
        {value: 4, label_key: 'Total healing taken'},
        {value: 5, label_key: 'Effective healing done'},
        {value: 6, label_key: 'Effective healing taken'},
        {value: 7, label_key: 'Overhealing done'},
        {value: 8, label_key: 'Overhealing taken'},
        {value: 21, label_key: 'Absorb done'},
        {value: 22, label_key: 'Absorb taken'},
        {value: 23, label_key: 'Effective heal and absorb done'},
        {value: 24, label_key: 'Effective heal and absorb taken'},
        {value: 9, label_key: 'Threat done'},
        {value: 10, label_key: 'Threat taken'},
    ];

    constructor(
        private activatedRouteService: ActivatedRoute,
        private raidDetailService: RaidDetailService,
        private router_service: Router,
        private instanceDataService: InstanceDataService
    ) {
        this.subscription_abilities = this.raidDetailService.abilities.subscribe(abilities => this.abilities = abilities);
        this.subscription_ability_details = this.raidDetailService.ability_details.subscribe(ability_details => this.ability_details = ability_details);
        this.raidDetailService.select(this.current_meter_selection);

        this.activatedRouteService.firstChild?.paramMap.subscribe(params => {
            this.current_meter_selection = Number(params.get("meter"));
            this.current_ability_selection = Number(params.get("spell_id"));
            this.raidDetailService.select(this.current_meter_selection);
        });
        this.subscription = this.instanceDataService.knecht_updates.subscribe(([updates, ]) => {
            if (updates.includes(KnechtUpdates.FilterChanging))
                this.ability_details = [];
        });
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
        this.subscription_abilities?.unsubscribe();
        this.subscription_ability_details?.unsubscribe();
    }

    get current_ability_details(): Array<DetailRow> {
        const has_ability = this.ability_details.some(([unit_id, ab_details]) =>
            ab_details.some(([ability_id, i_details]) => ability_id === this.current_ability_selection));

        if (!has_ability) {
            if (this.abilities.length > 0 && this.ability_details.length > 0) {
                this.current_ability_selection = this.abilities[0].value as number;
                this.adjust_path();
                return this.current_ability_details;
            }
            return [];
        }

        return this.ability_details.reduce((acc, [unit_id, ab_details]) => {
            const detail_rows = ab_details.find(([ability_id, dr]) => ability_id === this.current_ability_selection);
            if (detail_rows === undefined)
                return acc;
            return merge_detail_rows(acc, detail_rows[1].map(([ht, dr]) => dr));
        }, []);
    }

    change_ability_selection(selection: number): void {
        selection = Number(selection);
        if (this.current_ability_selection === selection)
            return;

        this.current_ability_selection = selection;
        this.adjust_path();
    }

    change_meter_selection(selection: number): void {
        selection = Number(selection);
        if (this.current_meter_selection === selection)
            return;

        this.current_meter_selection = selection;
        this.raidDetailService.select(selection);
        this.adjust_path();
    }

    private adjust_path(): void {
        if (location.pathname.endsWith("detail")) {
            this.router_service.navigate([location.pathname + "/" + this.current_meter_selection + "/" + this.current_ability_selection]);
        } else {
            this.router_service.navigate([ location.pathname.substr(1, location.pathname.indexOf("detail") + 6) + "/" + this.current_meter_selection + "/" + this.current_ability_selection]);
        }
    }
}
