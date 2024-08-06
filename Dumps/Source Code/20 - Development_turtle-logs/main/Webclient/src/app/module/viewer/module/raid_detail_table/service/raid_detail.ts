import {Injectable, OnDestroy} from "@angular/core";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {DetailRow} from "../domain_value/detail_row";
import {SelectOption} from "../../../../../template/input/select_input/domain_value/select_option";
import {HitType} from "../../../domain_value/hit_type";
import {HealMode} from "../../../domain_value/heal_mode";
import {DetailDamageService} from "./detail_damage";
import {DetailHealService} from "./detail_heal";
import {DetailThreatService} from "./detail_threat";
import {DetailAbsorbService} from "./detail_absorb";
import {DetailHealAndAbsorbService} from "./detail_heal_and_absorb";

@Injectable({
    providedIn: "root",
})
export class RaidDetailService implements OnDestroy {

    private subscription: Subscription;

    private abilities$: BehaviorSubject<Array<SelectOption>> = new BehaviorSubject([]);
    private ability_details$: BehaviorSubject<Array<[number, Array<[number, Array<[HitType, DetailRow]>]>]>> = new BehaviorSubject([]);
    private target_summary$: BehaviorSubject<Array<[number, Array<[number, number]>]>> = new BehaviorSubject([]);

    private current_selection: number = -1;

    constructor(
        private detail_damage_service: DetailDamageService,
        private detail_heal_service: DetailHealService,
        private detail_threat_service: DetailThreatService,
        private detail_absorb_service: DetailAbsorbService,
        private detail_heal_and_absorb_service: DetailHealAndAbsorbService
    ) {
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }

    get abilities(): Observable<Array<SelectOption>> {
        return this.abilities$.asObservable();
    }

    get ability_details(): Observable<Array<[number, Array<[number, Array<[HitType, DetailRow]>]>]>> {
        return this.ability_details$.asObservable();
    }

    get target_summary(): Observable<Array<[number, Array<[number, number]>]>> {
        return this.target_summary$.asObservable();
    }

    select(selection: number): void {
        if (this.current_selection === selection)
            return;

        this.subscription?.unsubscribe();

        switch (selection) {
            case 1:
            case 2: {
                const [abilities, ability_details, target_summary] = this.detail_damage_service.get_ability_and_details(selection === 2);
                this.subscription = abilities.subscribe(i_abilities => this.abilities$.next(i_abilities));
                this.subscription.add(ability_details.subscribe(i_ability_details => this.ability_details$.next(i_ability_details)));
                this.subscription.add(target_summary.subscribe(i_target_summary => this.target_summary$.next(i_target_summary)));
                break;
            }
            case 3:
            case 4: {
                const [abilities, ability_details, target_summary] = this.detail_heal_service.get_ability_and_details(HealMode.Total, selection === 4);
                this.subscription = abilities.subscribe(i_abilities => this.abilities$.next(i_abilities));
                this.subscription.add(ability_details.subscribe(i_ability_details => this.ability_details$.next(i_ability_details)));
                this.subscription.add(target_summary.subscribe(i_target_summary => this.target_summary$.next(i_target_summary)));
                break;
            }
            case 5:
            case 6: {
                const [abilities, ability_details, target_summary] = this.detail_heal_service.get_ability_and_details(HealMode.Effective, selection === 6);
                this.subscription = abilities.subscribe(i_abilities => this.abilities$.next(i_abilities));
                this.subscription.add(ability_details.subscribe(i_ability_details => this.ability_details$.next(i_ability_details)));
                this.subscription.add(target_summary.subscribe(i_target_summary => this.target_summary$.next(i_target_summary)));
                break;
            }
            case 7:
            case 8: {
                const [abilities, ability_details, target_summary] = this.detail_heal_service.get_ability_and_details(HealMode.Overheal, selection === 8);
                this.subscription = abilities.subscribe(i_abilities => this.abilities$.next(i_abilities));
                this.subscription.add(ability_details.subscribe(i_ability_details => this.ability_details$.next(i_ability_details)));
                this.subscription.add(target_summary.subscribe(i_target_summary => this.target_summary$.next(i_target_summary)));
                break;
            }
            case 9:
            case 10: {
                const [abilities, ability_details, target_summary] = this.detail_threat_service.get_ability_and_details(selection === 10);
                this.subscription = abilities.subscribe(i_abilities => this.abilities$.next(i_abilities));
                this.subscription.add(ability_details.subscribe(i_ability_details => this.ability_details$.next(i_ability_details)));
                this.subscription.add(target_summary.subscribe(i_target_summary => this.target_summary$.next(i_target_summary)));
                break;
            }
            case 21:
            case 22: {
                const [abilities, ability_details, target_summary] = this.detail_absorb_service.get_ability_and_details(selection === 22);
                this.subscription = abilities.subscribe(i_abilities => this.abilities$.next(i_abilities));
                this.subscription.add(ability_details.subscribe(i_ability_details => this.ability_details$.next(i_ability_details)));
                this.subscription.add(target_summary.subscribe(i_target_summary => this.target_summary$.next(i_target_summary)));
                break;
            }
            case 23:
            case 24: {
                const [abilities, ability_details, target_summary] = this.detail_heal_and_absorb_service.get_ability_and_details(selection === 24);
                this.subscription = abilities.subscribe(i_abilities => this.abilities$.next(i_abilities));
                this.subscription.add(ability_details.subscribe(i_ability_details => this.ability_details$.next(i_ability_details)));
                this.subscription.add(target_summary.subscribe(i_target_summary => this.target_summary$.next(i_target_summary)));
                break;
            }
        }

        this.current_selection = selection;
    }
}
