import {Injectable, OnDestroy} from "@angular/core";
import {Observable, Subject, Subscription} from "rxjs";
import {RaidConfigurationService} from "./raid_configuration";
import {debounceTime} from "rxjs/operators";

@Injectable({
    providedIn: "root",
})
export class RaidConfigurationSelectionService implements OnDestroy {

    private subscription: Subscription;

    private source_selection$: Subject<Array<number>> = new Subject();
    private target_selection$: Subject<Array<number>> = new Subject();
    private ability_selection$: Subject<Array<number>> = new Subject();
    private active_event_types: Map<number, number> = new Map<number, number>();
    private event_type_selection_changed: Subject<void> = new Subject();

    constructor(
        private raidConfigurationService: RaidConfigurationService
    ) {
        this.subscription = this.event_type_selection_changed.pipe(debounceTime(50))
            .subscribe(() => this.raidConfigurationService.select_event_types([...this.active_event_types.entries()]
                .filter(([, num]) => num > 0).map(([evt_type]) => evt_type)));
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }

    get source_selection(): Observable<Array<number>> {
        return this.source_selection$.asObservable();
    }

    get target_selection(): Observable<Array<number>> {
        return this.target_selection$.asObservable();
    }

    get ability_selection(): Observable<Array<number>> {
        return this.ability_selection$.asObservable();
    }

    select_sources(sources: Array<number>): void {
        this.source_selection$.next(sources);
        this.raidConfigurationService.update_source_filter(sources, true, true);
    }

    select_targets(targets: Array<number>): void {
        this.target_selection$.next(targets);
        this.raidConfigurationService.update_target_filter(targets, true, true);
    }

    select_abilities(abilities: Array<number>): void {
        this.ability_selection$.next(abilities);
        this.raidConfigurationService.update_ability_filter(abilities, true, true);
    }

    register_event_type(event_type: number): void {
        if (this.active_event_types.has(event_type))
            this.active_event_types.set(event_type, this.active_event_types.get(event_type) + 1);
        else
            this.active_event_types.set(event_type, 1);
        this.event_type_selection_changed.next();
    }

    unregister_event_type(event_type: number): void {
        if (!this.active_event_types.has(event_type))
            return;

        const current_amount = this.active_event_types.get(event_type);
        if (current_amount - 1 <= 0)
            this.active_event_types.delete(event_type);
        else
            this.active_event_types.set(event_type, current_amount - 1);
        this.event_type_selection_changed.next();
    }

    update_stack(): void {
        this.raidConfigurationService.update_stack();
    }
}
