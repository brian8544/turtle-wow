import {Injectable, OnDestroy} from "@angular/core";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {DeathOverviewRow} from "../module/deaths_overview/domain_value/death_overview_row";
import {UnAuraOverviewRow} from "../module/un_aura_overview/domain_value/un_aura_overview_row";
import {MeterDamageService} from "./meter_damage";
import {MeterHealService} from "./meter_heal";
import {MeterThreatService} from "./meter_threat";
import {MeterDeathService} from "./meter_death";
import {MeterDispelService} from "./meter_dispel";
import {MeterInterruptService} from "./meter_interrupt";
import {MeterSpellStealService} from "./meter_spell_steal";
import {MeterAuraUptimeService} from "./meter_aura_uptime";
import {MeterAbsorbService} from "./meter_absorb";
import {MeterHealAndAbsorbService} from "./meter_heal_and_absorb";
import {RaidConfigurationSelectionService} from "../../raid_configuration_menu/service/raid_configuration_selection";
import {MeterAuraGainService} from "./meter_aura_gain";
import {AuraGainOverviewRow} from "../domain_value/aura_gain_overview_row";
import {HealMode} from "../../../domain_value/heal_mode";
import {MeterSpellCastsService} from "./meter_spell_casts";
import {MeterUptimeService} from "./meter_uptime";

@Injectable({
    providedIn: "root",
})
export class RaidMeterService implements OnDestroy {

    private subscription_data: Subscription;

    private data$: BehaviorSubject<Array<[number, Array<[number, number] | DeathOverviewRow | UnAuraOverviewRow | AuraGainOverviewRow>
        | Array<[number, Array<[number, number]>]>]>> = new BehaviorSubject([]);

    private current_selection: number = -1;
    private last_event_type_selection: Set<number> = new Set();

    // For the export functionality
    unique_id: string;

    constructor(
        private meter_damage_service: MeterDamageService,
        private meter_heal_service: MeterHealService,
        private meter_threat_service: MeterThreatService,
        private meter_death_service: MeterDeathService,
        private meter_dispel_service: MeterDispelService,
        private meter_interrupt_service: MeterInterruptService,
        private meter_spell_steal_service: MeterSpellStealService,
        private meter_aura_uptime_service: MeterAuraUptimeService,
        private meter_absorb_service: MeterAbsorbService,
        private meter_heal_and_absorb_service: MeterHealAndAbsorbService,
        private meter_aura_gain_service: MeterAuraGainService,
        private meter_spell_casts_service: MeterSpellCastsService,
        private meter_uptime_service: MeterUptimeService,
        private raid_configuration_selection_service: RaidConfigurationSelectionService
    ) {
    }

    ngOnDestroy(): void {
        this.subscription_data?.unsubscribe();
    }

    get data(): Observable<Array<[number, Array<[number, number] | DeathOverviewRow | UnAuraOverviewRow | AuraGainOverviewRow> | Array<[number, Array<[number, number]>]>]>> {
        return this.data$.asObservable();
    }

    select(selection: number): void {
        if (this.current_selection === selection)
            return;

        for (const evt_type of this.last_event_type_selection.values())
            this.raid_configuration_selection_service.unregister_event_type(evt_type);
        this.last_event_type_selection = new Set();
        this.subscription_data?.unsubscribe();

        switch (selection) {
            case 1:
            case 2:
                this.register_evt_type(13);
                this.register_evt_type(12);
                this.subscription_data = this.meter_damage_service.get_data(selection === 2)
                    .subscribe(data => this.commit(data));
                break;
            case 3:
            case 4:
                this.register_evt_type(14);
                this.subscription_data = this.meter_heal_service.get_data(HealMode.Total, selection === 4)
                    .subscribe(data => this.commit(data));
                break;
            case 5:
            case 6:
                this.register_evt_type(14);
                this.subscription_data = this.meter_heal_service.get_data(HealMode.Effective, selection === 6)
                    .subscribe(data => this.commit(data));
                break;
            case 7:
            case 8:
                this.register_evt_type(14);
                this.subscription_data = this.meter_heal_service.get_data(HealMode.Overheal, selection === 8)
                    .subscribe(data => this.commit(data));
                break;
            case 9:
            case 10:
                this.register_evt_type(15);
                this.subscription_data = this.meter_threat_service.get_data(selection === 10)
                    .subscribe(data => this.commit(data));
                break;
            case 11:
            case 12:
                this.register_evt_type(14);
                this.register_evt_type(13);
                this.register_evt_type(12);
                this.register_evt_type(1);
                this.subscription_data = this.meter_death_service.get_data(selection === 12)
                    .subscribe(data => this.commit(data));
                break;
            case 13:
            case 14:
                this.register_evt_type(9);
                this.subscription_data = this.meter_dispel_service.get_data(selection === 14)
                    .subscribe(data => this.commit(data));
                break;
            case 15:
            case 16:
                this.register_evt_type(7);
                this.subscription_data = this.meter_interrupt_service.get_data(selection === 16)
                    .subscribe(data => this.commit(data));
                break;
            case 17:
            case 18:
                this.register_evt_type(8);
                this.subscription_data = this.meter_spell_steal_service.get_data(selection === 18)
                    .subscribe(data => this.commit(data));
                break;
            case 19:
            case 20:
                this.register_evt_type(6);
                this.subscription_data = this.meter_aura_uptime_service.get_data(selection === 20)
                    .subscribe(data => this.commit(data));
                break;
            case 21:
            case 22:
                this.register_evt_type(6);
                this.subscription_data = this.meter_absorb_service.get_data(selection === 22)
                    .subscribe(data => this.commit(data));
                break;
            case 23:
            case 24:
                this.register_evt_type(14);
                this.register_evt_type(13);
                this.register_evt_type(12);
                this.register_evt_type(6);
                this.subscription_data = this.meter_heal_and_absorb_service.get_data(selection === 24)
                    .subscribe(data => this.commit(data));
                break;
            case 25:
            case 26:
                this.register_evt_type(6);
                this.subscription_data = this.meter_aura_gain_service.get_data(selection === 26)
                    .subscribe(data => this.commit(data));
                break;
            case 27:
            case 28:
                this.register_evt_type(0);
                this.subscription_data = this.meter_spell_casts_service.get_data(selection === 28)
                    .subscribe(data => this.commit(data));
                break;
            case 29:
            case 30:
                this.register_evt_type(14);
                this.register_evt_type(13);
                this.register_evt_type(12);
                this.subscription_data = this.meter_uptime_service.get_data(selection === 30)
                    .subscribe(data => this.commit(data));
                break;
        }

        this.current_selection = selection;
    }

    private register_evt_type(evt_type: number): void {
        this.raid_configuration_selection_service.register_event_type(evt_type);
        this.last_event_type_selection.add(evt_type);
    }

    private commit(data: Array<[number, Array<[number, number] | DeathOverviewRow | UnAuraOverviewRow | AuraGainOverviewRow> | Array<[number, Array<[number, number]>]>]>): void {
        this.data$.next(data);
    }
}
