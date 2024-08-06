import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import {SelectOption} from "../../../../../../template/input/select_input/domain_value/select_option";
import {from, Subject, Subscription} from "rxjs";
import {InstanceDataService} from "../../../../service/instance_data";
import {SettingsService} from "src/app/service/settings";
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
import {ViewerMode} from "../../../../domain_value/viewer_mode";
import {InstanceViewerMeta} from "../../../../domain_value/instance_viewer_meta";
import {RaidConfigurationSelectionService} from "../../../raid_configuration_menu/service/raid_configuration_selection";
import {RaidMeterService} from "../../service/raid_meter";
import {RaidDetailService} from "../../../raid_detail_table/service/raid_detail";
import {HitType} from "../../../../domain_value/hit_type";
import {DetailRow} from "../../../raid_detail_table/domain_value/detail_row";
import {DeathOverviewRow} from "../../module/deaths_overview/domain_value/death_overview_row";
import {UnAuraOverviewRow} from "../../module/un_aura_overview/domain_value/un_aura_overview_row";
import {MeterDamageService} from "../../service/meter_damage";
import {MeterHealService} from "../../service/meter_heal";
import {MeterThreatService} from "../../service/meter_threat";
import {MeterDeathService} from "../../service/meter_death";
import {MeterDispelService} from "../../service/meter_dispel";
import {DetailDamageService} from "../../../raid_detail_table/service/detail_damage";
import {DetailHealService} from "../../../raid_detail_table/service/detail_heal";
import {DetailThreatService} from "../../../raid_detail_table/service/detail_threat";
import {EventLogService} from "../../../raid_event_log/service/event_log";
import {auditTime, map} from "rxjs/operators";
import {MeterInterruptService} from "../../service/meter_interrupt";
import {MeterSpellStealService} from "../../service/meter_spell_steal";
import {MeterAuraUptimeService} from "../../service/meter_aura_uptime";
import {flatten_aura_uptime_to_spell_map, flatten_aura_uptime_to_subject_map} from "../../stdlib/aura_uptime";
import {MeterAbsorbService} from "../../service/meter_absorb";
import {MeterHealAndAbsorbService} from "../../service/meter_heal_and_absorb";
import {DetailAbsorbService} from "../../../raid_detail_table/service/detail_absorb";
import {DetailHealAndAbsorbService} from "../../../raid_detail_table/service/detail_heal_and_absorb";
import {MeterAuraGainService} from "../../service/meter_aura_gain";
import {AuraGainOverviewRow} from "../../domain_value/aura_gain_overview_row";
import {get_unit_id} from "../../../../domain_value/unit";
import {RaidMeterExportService} from "../../service/raid_meter_export";
import {KnechtUpdates} from "../../../../domain_value/knecht_updates";
import {UnitBasicInformation, UnitService} from "../../../../service/unit";
import {SpellBasicInformation, SpellService} from "../../../../service/spell";
import {merge_detail_rows} from "../../../raid_detail_table/stdlib/util";
import {MeterSpellCastsService} from "../../service/meter_spell_casts";
import {MeterUptimeService} from "../../service/meter_uptime";

@Component({
    selector: "RaidMeter",
    templateUrl: "./raid_meter.html",
    styleUrls: ["./raid_meter.scss"],
    providers: [
        MeterHealAndAbsorbService,
        MeterDamageService,
        MeterHealService,
        MeterThreatService,
        MeterDeathService,
        MeterDispelService,
        MeterInterruptService,
        MeterSpellStealService,
        MeterAuraUptimeService,
        MeterAbsorbService,
        MeterAuraGainService,
        MeterSpellCastsService,
        MeterUptimeService,
        RaidMeterService,
        // Raid Detail Service
        DetailDamageService,
        DetailHealService,
        DetailThreatService,
        DetailAbsorbService,
        DetailHealAndAbsorbService,
        RaidDetailService,
        // Tooltip
        EventLogService
    ]
})
export class RaidMeterComponent implements OnDestroy, OnInit {

    current_meta: InstanceViewerMeta;

    @Input() unique_id: string;

    private subscription: Subscription;

    private cookie_id: string;
    private current_data: Array<[number, Array<[number, number] | DeathOverviewRow | UnAuraOverviewRow | AuraGainOverviewRow> | Array<[number, Array<[number, number]>]>]> = [];
    private ability_details: Array<[number, Array<[number, Array<[HitType, DetailRow]>]>]> = [];
    private target_summary: Array<[number, Array<[number, number]>]> = [];

    private update_bars$: Subject<void> = new Subject();

    abilities: Map<number, SpellBasicInformation> = new Map();
    units: Map<number, UnitBasicInformation> = new Map();
    bar_tooltips: Map<number, any> = new Map();

    in_ability_mode: boolean = false;

    current_attempt_duration: number = 1;
    bars: Array<[number, number] | DeathOverviewRow> = [];

    current_selection: number = -1;
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
        {value: 11, label_key: 'Deaths'},
        {value: 12, label_key: 'Kills'},
        {value: 13, label_key: 'Dispels done'},
        {value: 14, label_key: 'Dispels received'},
        {value: 15, label_key: 'Interrupt done'},
        {value: 16, label_key: 'Interrupt received'},
        {value: 17, label_key: 'Spell steal done'},
        {value: 18, label_key: 'Spell steal received'},
        {value: 19, label_key: 'Source aura uptime'},
        {value: 20, label_key: 'Target aura uptime'},
        {value: 25, label_key: 'Auras given'},
        {value: 26, label_key: 'Auras gotten'},
        {value: 27, label_key: 'Spell casts done'},
        {value: 28, label_key: 'Spell casts taken'},
        {value: 29, label_key: 'Source Uptime'},
        {value: 30, label_key: 'Target Uptime'},
        {value: 99, label_key: 'Event Log'},
    ];

    constructor(
        private activatedRouteService: ActivatedRoute,
        private routerService: Router,
        private settingsService: SettingsService,
        private instanceDataService: InstanceDataService,
        private raidConfigurationSelectionService: RaidConfigurationSelectionService,
        private raidMeterService: RaidMeterService,
        private raidDetailService: RaidDetailService,
        private event_log_service: EventLogService,
        private raid_meter_export_service: RaidMeterExportService,
        private unitService: UnitService,
        private spellService: SpellService,
    ) {
        this.units = this.unitService.units;
        this.abilities = this.spellService.spells;

        this.subscription = this.activatedRouteService.paramMap.subscribe(params => {
            const new_mode = params.get("mode") === ViewerMode.Ability;
            if (this.in_ability_mode !== new_mode) {
                this.in_ability_mode = new_mode;
                this.update_bars$.next();
            }
        });
        this.subscription.add(this.instanceDataService.attempt_total_duration.subscribe(duration => this.current_attempt_duration = duration / 1000));
        this.subscription.add(this.instanceDataService.meta.subscribe(meta => this.current_meta = meta));
        this.subscription.add(this.raidMeterService.data.subscribe(rows => {
            this.current_data = rows;
            this.update_bars$.next();
        }));
        this.subscription.add(this.raidDetailService.target_summary.subscribe(target_summary => this.target_summary = target_summary));
        this.subscription.add(this.raidDetailService.ability_details.subscribe(details => {
            this.ability_details = details;
            this.update_bars$.next();
        }));
        this.subscription.add(this.raid_meter_export_service.meter_selections$.subscribe(([id, selection]) => {
            if (id === this.unique_id) {
                this.current_selection = Number(selection);
                this.selection_changed(this.current_selection);
            }
        }));
        this.subscription.add(this.instanceDataService.knecht_updates.subscribe(([updates,]) => {
            if (updates.includes(KnechtUpdates.FilterChanging)) {
                this.bars = [];
            }
        }));
        this.subscription.add(this.update_bars$.pipe(auditTime(100)).subscribe(() => this.update_bars(this.current_data)));
    }

    ngOnInit(): void {
        this.cookie_id = "raid_meter_" + this.unique_id;
        this.raidMeterService.unique_id = this.unique_id;

        if (this.settingsService.check(this.cookie_id)) {
            this.current_selection = this.settingsService.get(this.cookie_id);
        } else {
            this.current_selection = 1;
        }
        this.selection_changed(Number(this.current_selection));
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }

    get bar_subjects(): Map<number, UnitBasicInformation | SpellBasicInformation> {
        if (this.in_ability_mode)
            return this.abilities;
        return this.units;
    }

    get total(): number {
        if ([11, 12, 13, 14, 15, 16, 17, 18].includes(this.current_selection) && this.in_ability_mode)
            return this.bars.length;
        return this.bars.reduce((acc, bar) => acc + bar[1], 0);
    }

    get total_ps(): number {
        return this.total / this.current_attempt_duration;
    }

    selection_changed(selection: number): void {
        selection = Number(selection);
        if (this.current_selection === -1)
            return;

        if (selection === 99) {
            this.routerService.navigate(["/viewer/" + this.current_meta?.instance_meta_id + "/event_log/by_actor"]);
            return;
        }

        this.raid_meter_export_service.setMeterSelection(this.unique_id, selection);

        this.current_data = [];
        this.bars = [];
        this.current_selection = selection;
        this.raidMeterService.select(selection);
        this.raidDetailService.select(selection);

        if (!!this.unique_id)
            this.settingsService.set(this.cookie_id, selection);
    }

    bar_clicked(bar: [number, number]): void {
        if ([19, 20, 25, 26, 27, 28, 29, 30].includes(this.current_selection) && this.in_ability_mode)
            return;

        if (!this.in_ability_mode)
            this.raidConfigurationSelectionService.select_sources([bar[0]]);
        else
            this.raidConfigurationSelectionService.update_stack();
        this.routerService.navigate(['/viewer/' + this.current_meta?.instance_meta_id + '/' + this.get_router_link(bar)], {skipLocationChange: true} as NavigationExtras);
    }

    private get_bar_tooltip(subject_id: number): any {
        let type;
        let payload;
        let specifics = {};

        if (!this.in_ability_mode) {
            if ([11, 12, 13, 14, 15, 16, 17, 18].includes(this.current_selection)) {
                if ([13, 14].includes(this.current_selection)) {
                    type = 9;
                } else if ([15, 16].includes(this.current_selection)) {
                    type = 12;
                } else if ([17, 18].includes(this.current_selection)) {
                    type = 13;
                } else {
                    type = 7;
                }
                payload = () => this.current_data.find(entry => entry[0] === subject_id)[1].slice(0, 10);
                specifics = {
                    abilities: this.abilities,
                    units: this.units,
                };
            } else if ([19, 20].includes(this.current_selection)) {
                type = 17;
                payload = () => {
                    const result = [];
                    // @ts-ignore
                    for (const [spell_id, intervals] of flatten_aura_uptime_to_spell_map(this.current_data
                        .filter(([unit_id, abilities]) => unit_id === subject_id))) {
                        const frac_duration = (100 * intervals.reduce((acc, [start, end]) => acc + (end - start), 0)) / (this.current_attempt_duration * 1000);
                        result.push([this.abilities.get(spell_id).name, Math.min(100, frac_duration)]);
                    }
                    return result.sort((left, right) => right[1] - left[1])
                        .slice(0, 10)
                        .map(([spell_name, amount]) => [spell_name, amount.toFixed(1) + "%"]);

                };
            } else if ([25, 26].includes(this.current_selection)) {
                type = 17;
                payload = () => {
                    const result = new Map<number, number>();
                    for (const int_row of this.current_data.find(([unit_id]) => unit_id === subject_id)[1]) {
                        const row = int_row as AuraGainOverviewRow;
                        if (result.has(row.ability)) result.set(row.ability, result.get(row.ability) + 1);
                        else result.set(row.ability, 1);
                    }
                    return [...result.entries()].sort((left, right) => right[1] - left[1])
                        .slice(0, 10)
                        .map(([ability_id, amount]) => [this.abilities.get(ability_id).name, amount]);
                };
            } else if ([27, 28].includes(this.current_selection)) {
                type = 17;
                payload = () => {
                    return this.ability_rows((this.current_data as Array<[number, Array<[number, number]>]>)
                        .filter(([unit_id, abilities]) => unit_id === subject_id))
                        .sort((left, right) => right[1] - left[1])
                        .slice(0, 10)
                        .map(([ability_id, amount]) => [this.abilities.get(ability_id).name, amount]);
                };
            } else if ([29, 30].includes(this.current_selection)) {
                type = 999;
                payload = "No tooltip available!";
            } else {
                type = 5;
                payload = () => {
                    const ab_details = this.ability_details.find(([unit_id, ab_det]) => unit_id === subject_id);
                    return this.ability_rows((this.current_data as Array<[number, Array<[number, number]>]>)
                        .filter(([unit_id, abilities]) => unit_id === subject_id))
                        .sort((left, right) => right[1] - left[1])
                        .slice(0, 10)
                        .map(([ability_id, amount]) => [this.abilities.get(ability_id).name, amount,
                            ab_details[1].find(([i_ability_id,]) => i_ability_id === ability_id)[1]]);
                };
                specifics = {
                    target_summary: () => this.target_summary.find(([se_unit_id,]) => se_unit_id === subject_id)[1]
                        .sort((left, right) => right[1] - left[1])
                        .slice(0, 5)
                        .map(([unit_id, amount]) => [this.units.get(unit_id)?.name, amount])
                };
            }
        } else {
            if ([11, 12, 13, 14, 15, 16, 17, 18].includes(this.current_selection)) {
                type = 8;
                payload = () => {
                    this.event_log_service.set_actor(true);
                    const unit_id = get_unit_id((this.bars[subject_id] as DeathOverviewRow).murdered, false);
                    return from(this.event_log_service.get_event_log_entries((this.bars[subject_id] as any).timestamp))
                        .pipe(map(entries => entries.filter(evt => evt.subject_id === unit_id).slice(0, 20)));
                };
            } else if ([19, 20, 27, 28].includes(this.current_selection)) {
                type = 14;
                specifics = {
                    spell_id: subject_id,
                    expansion_id: this.current_meta?.expansion_id,
                };
            } else if ([25, 26].includes(this.current_selection)) {
                type = 15;
                payload = () => this.current_data.reduce((acc, item) => [...acc, ...(item[1] as Array<AuraGainOverviewRow>)
                    .filter(row => row.ability === subject_id)], []).sort((left, right) => right.timestamp - left.timestamp).slice(0, 10);
                specifics = {
                    abilities: this.abilities,
                    units: this.units,
                    icon: this.abilities.get(subject_id).icon
                };
            } else if ([29, 30].includes(this.current_selection)) {
                type = 999;
                payload = "No tooltip available!";
            }  else {
                type = 6;
                const result = this.ability_details.reduce((acc, [i_unit_id, i_details]) =>
                    merge_detail_rows(acc, i_details.filter(([i_ability_id,]) => i_ability_id === subject_id)
                        .reduce((i_acc, [i_ab_id, i_ht_a_dr]) => merge_detail_rows(i_acc, i_ht_a_dr.map(([i_ht, i_dr]) => i_dr)), [])), []);
                payload = () => result;
                specifics = {
                    icon: this.abilities.get(subject_id).icon
                };
            }
        }

        return {
            type,
            payload,
            ...specifics
        };
    }

    private get_router_link(bar: [number, number]): string {
        if (this.in_ability_mode)
            return 'detail/' + this.current_selection.toString() + '/' + bar[0].toString();
        return 'ability';
    }

    private ability_rows(data: Array<[number, Array<[number, number]>]>): Array<[number, number]> {
        // @ts-ignore
        return [...data.reduce((acc, [unit_id, abilities]) => {
            const ability_amount = acc;
            for (const [ability_id, amount] of abilities) {
                if (ability_amount.has(ability_id)) ability_amount.set(ability_id, ability_amount.get(ability_id) + amount);
                else ability_amount.set(ability_id, amount);
            }
            return ability_amount;
        }, new Map())];
    }

    private update_bars(rows: Array<[number, Array<[number, number] | DeathOverviewRow | UnAuraOverviewRow | AuraGainOverviewRow> | Array<[number, Array<[number, number]>]>]>): void {
        // TODO: Refactor this mess
        this.current_data = rows;
        let result;
        if (this.in_ability_mode) {
            if ([11, 12, 13, 14, 15, 16, 17, 18].includes(this.current_selection)) result = rows.reduce((acc, [unit_id, secondary]) => [...acc, ...secondary], []);
            else if ([19, 20].includes(this.current_selection)) {
                result = [];
                // @ts-ignore
                for (const [spell_id, intervals] of flatten_aura_uptime_to_spell_map(rows)) {
                    const frac_duration = (100 * intervals.reduce((acc, [start, end]) => acc + (end - start), 0)) / (this.current_attempt_duration * 1000);
                    result.push([spell_id, Math.min(100, frac_duration)]);
                }
            } else if ([25, 26].includes(this.current_selection)) {
                const acc = new Map<number, number>();
                for (const [, i_rows] of this.current_data) {
                    for (const int_row of i_rows) {
                        const row = int_row as AuraGainOverviewRow;
                        if (acc.has(row.ability)) acc.set(row.ability, acc.get(row.ability) + 1);
                        else acc.set(row.ability, 1);
                    }
                }
                result = [...acc.entries()].sort((left, right) => right[1] - left[1]);
            } else if ([29, 30].includes(this.current_selection)) {
                result = [];
            }
            else result = this.ability_rows(rows as Array<[number, Array<[number, number]>]>);
        } else {
            if ([11, 12, 13, 14, 15, 16, 17, 18, 25, 26].includes(this.current_selection)) {
                result = rows.map(([unit_id, secondary]) => [unit_id, secondary.length]);
            } else if ([19, 20].includes(this.current_selection)) {
                result = [];
                // @ts-ignore
                for (const [spell_id, intervals] of flatten_aura_uptime_to_subject_map(rows)) {
                    const frac_duration = (100 * intervals.reduce((acc, [start, end]) => acc + (end - start), 0)) / (this.current_attempt_duration * 1000);
                    result.push([spell_id, Math.min(100, frac_duration)]);
                }
            } else if ([29, 30].includes(this.current_selection)) {
                const total_time = this.current_attempt_duration * 1000;
                result = (rows as Array<[number, Array<[number, number]>]>).map(([subject_id, intervals]) =>
                    [subject_id, 100 * intervals.reduce((acc, interval) => interval[1] - interval[0], 0) / total_time]);
            } else {
                result = (rows as Array<[number, Array<[number, number]>]>).map(([unit_id, abilities]) =>
                    [unit_id, abilities.reduce((acc, [ability_id, amount]) => acc + amount, 0)])
                    .filter(([unit_id, row_amount]) => row_amount !== 0);
            }
        }

        if ([11, 12, 13, 14, 15, 16, 17, 18].includes(this.current_selection) && this.in_ability_mode)
            this.bars = result.sort((left, right) => right.timestamp - left.timestamp);
        else this.bars = result.sort((left, right) => right[1] - left[1]);

        // Bar tooltips
        if ([11, 12, 13, 14, 15, 16, 17, 18].includes(this.current_selection) && this.in_ability_mode) {
            for (const [row_index, row] of this.bars.entries())
                this.bar_tooltips.set(row_index, this.get_bar_tooltip(row_index));
        } else {
            // @ts-ignore
            for (const [subject_id, amount] of this.bars)
                this.bar_tooltips.set(subject_id, this.get_bar_tooltip(subject_id));
        }
    }

    get show_per_second(): boolean {
        return ![11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 25, 26, 27, 28, 29, 30].includes(this.current_selection);
    }

    format_number(number_str: string): string {
        return number_str.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }

}
