import {Injectable, OnDestroy} from "@angular/core";
import {combineLatest, Observable, Subject, Subscription} from "rxjs";
import {EventLogEntry} from "../domain_value/event_log_entry";
import {InstanceDataService} from "../../../service/instance_data";
import {debounceTime, map} from "rxjs/operators";
import {Event, MeleeDamage, SpellDamage} from "../../../domain_value/event";
import {UnitService} from "../../../service/unit";
import {hit_mask_to_hit_type_array, HitType} from "../../../domain_value/hit_type";
import {KnechtUpdates} from "../../../domain_value/knecht_updates";
import {
    se_aura_application,
    se_combat_state,
    se_death,
    se_heal,
    se_interrupt,
    se_melee_damage,
    se_spell_cast,
    se_spell_damage,
    se_un_aura
} from "../../../extractor/sources";
import {
    te_aura_application,
    te_death,
    te_heal,
    te_interrupt,
    te_melee_damage,
    te_spell_cast,
    te_spell_damage,
    te_un_aura
} from "../../../extractor/targets";
import {
    ae_aura_application,
    ae_heal,
    ae_interrupt,
    ae_spell_cast,
    ae_spell_damage,
    ae_un_aura
} from "../../../extractor/abilities";
import {get_spell_components_total_amount_without_absorb, SpellComponent} from "../../../domain_value/damage";
import {school_mask_to_school_array} from "../../../domain_value/school";
import {InstanceViewerMeta} from "../../../domain_value/instance_viewer_meta";
import {get_unit_id} from "../../../domain_value/unit";

@Injectable({
    providedIn: "root",
})
export class EventLogService implements OnDestroy {

    private current_meta: InstanceViewerMeta;

    private subscription: Subscription = new Subscription();
    private event_log_entries$: Subject<Array<EventLogEntry>> = new Subject();
    private scrolled_page$: Subject<Array<EventLogEntry>> = new Subject();
    private internal_event_log_entries: Array<EventLogEntry> = [];

    private to_actor: boolean = false;
    private initialized: boolean = false;

    private last_global_offset: number = 0;
    private log_offsets: Map<number, [number, Set<number>]> = new Map([
        [0, [0, new Set()]],
        [1, [0, new Set()]],
        [2, [0, new Set()]],
        [3, [0, new Set()]],
        [4, [0, new Set()]],
        [5, [0, new Set()]],
        [6, [0, new Set()]],
        [7, [0, new Set()]],
        [8, [0, new Set()]],
        [9, [0, new Set()]],
        [10, [0, new Set()]],
        [11, [0, new Set()]],
        [12, [0, new Set()]],
        [13, [0, new Set()]],
        [14, [0, new Set()]],
        [15, [0, new Set()]],
    ]);

    public offset_changed: Subject<number> = new Subject();

    constructor(
        private instanceDataService: InstanceDataService,
        private unitService: UnitService
    ) {
        this.subscription.add(this.offset_changed.asObservable().pipe(debounceTime(2)).subscribe(async offset => {
            if (offset === 0) {
                // Reset
                for (const log_offset of this.log_offsets) {
                    log_offset[1][0] = 0;
                    log_offset[1][1].clear();
                }
            } else {
                if (this.last_global_offset > offset) {
                    // Scrolled up
                    for (let i = this.last_global_offset; i > offset; --i) {
                        for (const log_offset of this.log_offsets) {
                            if (log_offset[1][1].has(i)) {
                                log_offset[1][1].delete(i);
                                --log_offset[1][0];
                            }
                        }
                    }
                } else {
                    // Scrolled down
                    const log_entries = this.internal_event_log_entries;
                    for (let i = 0; i < (offset - this.last_global_offset); ++i) {
                        if (log_entries.length <= i)
                            break; // Scrolling too fast?
                        const log_entry = log_entries[i];
                        const log_offset = this.log_offsets.get(log_entry.type);
                        log_offset[1].add(offset + i);
                        ++log_offset[0];
                    }
                }
            }
            this.last_global_offset = offset;
            if (this.last_global_offset >= this.internal_event_log_entries.length - 25)
                await this.update_event_log_entries();
            this.scrolled_page$.next(this.internal_event_log_entries.slice(this.last_global_offset, this.last_global_offset + 19));
        }));
        this.subscription.add(this.instanceDataService.meta.subscribe(meta => this.current_meta = meta));
        this.subscription.add(this.instanceDataService.knecht_updates.subscribe(async ([knecht_update, _]) => {
            if (knecht_update.some(elem => [KnechtUpdates.NewData, KnechtUpdates.FilterChanged, KnechtUpdates.FilterInitialized, KnechtUpdates.WorkerInitialized].includes(elem))) {
                this.internal_event_log_entries = [];
                this.last_global_offset = 0;
                for (const key of this.log_offsets.keys())
                    this.log_offsets.set(key, [0, new Set()]);
                await this.update_event_log_entries();
                this.scrolled_page$.next(this.internal_event_log_entries.slice(0, 19));
            }
        }));
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }

    get event_log_entries(): Observable<Array<EventLogEntry>> {
        return this.event_log_entries$.asObservable();
    }

    get scrolled_page(): Observable<Array<EventLogEntry>> {
        return this.scrolled_page$.asObservable();
    }

    set_actor(to_actor: boolean): void {
        if (this.to_actor !== to_actor) {
            this.to_actor = to_actor;
            this.update_event_log_entries();
        }
    }

    private create_event_log_entry(type: number, event: Event, processor: (Event, entry) => void): EventLogEntry {
        const entry = {
            id: event[0],
            type,
            timestamp: event[1]
        };
        processor(event, entry);
        return (entry as EventLogEntry);
    }

    async get_event_log_entries(up_to_timestamp: number): Promise<Array<EventLogEntry>> {
        if (!this.instanceDataService.isInitialized())
            return [];

        const job_spell_casts = this.instanceDataService.knecht_spell_cast.event_log_spell_cast(this.to_actor, this.log_offsets.get(0)[0], up_to_timestamp);
        const job_death = this.instanceDataService.knecht_melee.event_log_deaths(this.to_actor, this.log_offsets.get(1)[0], up_to_timestamp);
        const job_aura_app = this.instanceDataService.knecht_aura.event_log_aura_application(this.to_actor, this.log_offsets.get(6)[0], up_to_timestamp);
        const job_interrupts = this.instanceDataService.knecht_un_aura.event_log_interrupt(this.to_actor, this.log_offsets.get(7)[0], up_to_timestamp);
        const job_spell_steals = this.instanceDataService.knecht_un_aura.event_log_spell_steal(this.to_actor, this.log_offsets.get(8)[0], up_to_timestamp);
        const job_dispels = this.instanceDataService.knecht_un_aura.event_log_dispel(this.to_actor, this.log_offsets.get(9)[0], up_to_timestamp);
        const job_melee = this.instanceDataService.knecht_melee.event_log_melee_damage(this.to_actor, this.log_offsets.get(12)[0], up_to_timestamp);
        const job_spell_dmg = this.instanceDataService.knecht_spell_damage.event_log_spell_damage(this.to_actor, this.log_offsets.get(13)[0], up_to_timestamp);
        const job_heal = this.instanceDataService.knecht_heal.event_log_heal(this.to_actor, this.log_offsets.get(14)[0], up_to_timestamp);

        const result_spell_casts = await job_spell_casts;
        const result_death = await job_death;
        const result_aura_app = await job_aura_app;
        const result_interrupts = await job_interrupts;
        const result_dispels = await job_dispels;
        const result_spell_steals = await job_spell_steals;
        const result_melee = await job_melee;
        const result_spell_damage = await job_spell_dmg;
        const result_heal = await job_heal;

        return [
            ...result_spell_casts.map(event => this.create_event_log_entry(0, event, (evt, entry) => this.process_spell_cast(evt, entry))),
            ...result_death.map(event => this.create_event_log_entry(1, event, (evt, entry) => this.process_death(evt, entry))),
            ...result_aura_app.map(event => this.create_event_log_entry(6, event, (evt, entry) => this.process_aura_application(evt, entry))),
            ...result_interrupts.map(event => this.create_event_log_entry(7, event, (evt, entry) => this.process_interrupt(evt, entry))),
            ...result_spell_steals.map(event => this.create_event_log_entry(8, event, (evt, entry) => this.process_spell_steal(evt, entry))),
            ...result_dispels.map(event => this.create_event_log_entry(9, event, (evt, entry) => this.process_dispel(evt, entry))),
            ...result_melee.map(event => this.create_event_log_entry(12, event, (evt, entry) => this.process_melee_damage(evt, entry))),
            ...result_spell_damage.map(event => this.create_event_log_entry(13, event, (evt, entry) => this.process_spell_damage(evt, entry))),
            ...result_heal.map(event => this.create_event_log_entry(14, event, (evt, entry) => this.process_heal(evt, entry))),
            // ...(await this.instanceDataService.knecht_replay.event_log_combat_state(this.to_actor, this.log_offsets.get(2)[0], up_to_timestamp))
            // .map(event => this.create_event_log_entry(2, event, (evt) => this.process_combat_state(evt))),
        ].sort((left, right) => {
            const cmp = right.timestamp - left.timestamp;
            if (cmp === 0)
                return right.id - left.id;
            return cmp;
        });
    }

    private async update_event_log_entries(): Promise<void> {
        let log_entries = await this.get_event_log_entries(0);
        this.internal_event_log_entries = this.internal_event_log_entries.filter(entry => !log_entries.find(i_entry => i_entry.id === entry.id))
            .concat(log_entries).sort((left, right) => {
                const cmp = right.timestamp - left.timestamp;
                if (cmp === 0)
                    return right.id - left.id;
                return cmp;
            });
        this.event_log_entries$.next(this.internal_event_log_entries);
    }

    private process_spell_cast(event: Event, entry: EventLogEntry): void {
        let subject_id;
        if (this.to_actor) subject_id = get_unit_id(te_spell_cast(event), false);
        else subject_id = get_unit_id(se_spell_cast(event), false);

        entry.subject_id = subject_id;
        entry.source_id = get_unit_id(se_spell_cast(event), false);
        entry.target_id = get_unit_id(te_spell_cast(event), false);
        entry.amount = event[5] as number;
        entry.source_ability_id = ae_spell_cast(event);
    }

    private process_combat_state(event: Event): [Observable<string>, number] {
        const subject$ = this.unitService.get_unit_name(se_combat_state(event), this.current_meta.end_ts ?? this.current_meta.start_ts);
        const subject_id = get_unit_id(se_combat_state(event), false);
        return [combineLatest([subject$])
            .pipe(map((([subject_name]) => {
                if (event[3])
                    return subject_name + " enters combat.";
                return subject_name + " leaves combat.";
            }))), subject_id];
    }

    private process_aura_application(event: Event, entry: EventLogEntry): void {
        let subject_id;
        if (this.to_actor) subject_id = get_unit_id(se_aura_application(event), false);
        else subject_id = get_unit_id(te_aura_application(event), false);

        entry.subject_id = subject_id;
        entry.source_id = get_unit_id(se_aura_application(event), false);
        entry.target_id = get_unit_id(te_aura_application(event), false);
        entry.amount = event[5] as number;
        entry.source_ability_id = ae_aura_application(event);
    }

    private process_interrupt(event: Event, entry: EventLogEntry): void {
        const spells = ae_interrupt(event);
        let subject_id;
        if (this.to_actor) subject_id = get_unit_id(te_interrupt(event), false);
        else subject_id = get_unit_id(se_interrupt(event), false);

        entry.subject_id = subject_id;
        entry.source_id = get_unit_id(se_interrupt(event), false);
        entry.target_id = get_unit_id(te_interrupt(event), false);
        entry.source_ability_id = spells[0];
        entry.target_ability_id = spells[1];
    }

    private process_spell_steal(event: Event, entry: EventLogEntry): void {
        const spells = ae_un_aura(event);
        let subject_id;
        if (this.to_actor) subject_id = get_unit_id(te_un_aura(event), false);
        else subject_id = get_unit_id(se_un_aura(event), false);

        entry.subject_id = subject_id;
        entry.source_id = get_unit_id(se_un_aura(event), false);
        entry.target_id = get_unit_id(te_un_aura(event), false);
        entry.source_ability_id = spells[0];
        entry.target_ability_id = spells[1];
    }

    private process_dispel(event: Event, entry: EventLogEntry): void {
        const spells = ae_un_aura(event);
        let subject_id;
        if (this.to_actor) subject_id = get_unit_id(te_un_aura(event), false);
        else subject_id = get_unit_id(se_un_aura(event), false);

        entry.subject_id = subject_id;
        entry.source_id = get_unit_id(se_un_aura(event), false);
        entry.target_id = get_unit_id(te_un_aura(event), false);
        entry.source_ability_id = spells[0];
        entry.target_ability_id = spells[1];
    }

    private process_melee_damage(event: MeleeDamage, entry: EventLogEntry): void {
        let subject_id;
        if (this.to_actor) subject_id = get_unit_id(te_melee_damage(event), false);
        else subject_id = get_unit_id(se_melee_damage(event), false);

        entry.subject_id = subject_id;
        entry.source_id = get_unit_id(se_melee_damage(event), false);
        entry.target_id = get_unit_id(te_melee_damage(event), false);
        entry.amount = get_spell_components_total_amount_without_absorb(event[5]);
        entry.hit_type_str = this.get_hit_type_localization(hit_mask_to_hit_type_array(event[4]));
        entry.trailer = event[5].map(component => this.get_spell_component_localization(component)).join(", ");
    }

    private process_spell_damage(event: SpellDamage, entry: EventLogEntry): void {
        let subject_id;
        if (this.to_actor) subject_id = get_unit_id(te_spell_damage(event), false);
        else subject_id = get_unit_id(se_spell_damage(event), false);

        entry.subject_id = subject_id;
        entry.source_id = get_unit_id(se_spell_damage(event), false);
        entry.target_id = get_unit_id(te_spell_damage(event), false);
        entry.amount = get_spell_components_total_amount_without_absorb(event[7]);
        entry.hit_type_str = this.get_hit_type_localization(hit_mask_to_hit_type_array(event[6]));
        entry.source_ability_id = ae_spell_damage(event);
        entry.trailer = event[7].map(component => this.get_spell_component_localization(component)).join(", ");
    }

    private process_heal(event: Event, entry: EventLogEntry): void {
        let subject_id;
        if (this.to_actor) subject_id = get_unit_id(te_heal(event), false);
        else subject_id = get_unit_id(se_heal(event), false);

        entry.subject_id = subject_id;
        entry.source_id = get_unit_id(se_heal(event), false);
        entry.target_id = get_unit_id(te_heal(event), false);
        entry.amount = event[9];
        entry.amount2 = event[8];
        entry.amount3 = event[8] - event[9];
        entry.hit_type_str = this.get_hit_type_localization(hit_mask_to_hit_type_array(event[6]));
        entry.source_ability_id = ae_heal(event);
        entry.trailer = this.format_number(event[9]) + this.get_mitigation_localization(event[10], 0, 0) +
            (entry.amount3 > 0 ? " (" + this.format_number(entry.amount3) + " overheal)" : "");
    }

    private process_death(event: Event, entry: EventLogEntry): void {
        let subject_id;
        if (this.to_actor) subject_id = get_unit_id(se_death(event), false);
        else subject_id = get_unit_id(te_death(event), false);

        entry.subject_id = subject_id;
        entry.source_id = get_unit_id(se_death(event), false);
        entry.target_id = get_unit_id(te_death(event), false);
    }

    private get_hit_type_localization(hit_mask: Array<HitType>, is_heal: boolean = false): string {
        for (const hit_type of hit_mask) {
            switch (hit_type) {
                case HitType.Hit:
                    if (is_heal)
                        return "heals";
                    return "hits";
                case HitType.Crit:
                    if (is_heal)
                        return "critically heals";
                    return "crits";
                case HitType.Dodge:
                    return "is dodged by";
                case HitType.Parry:
                    return "is parried by";
                case HitType.FullBlock:
                    return "is blocked by";
                case HitType.FullResist:
                    return "is resisted by";
                case HitType.FullAbsorb:
                    return "is absorbed by";
                case HitType.Crushing:
                    return "crushes";
                case HitType.Glancing:
                    return "glances";
                case HitType.Evade:
                    return "is evaded by";
                case HitType.Miss:
                    return "is missed by";
                case HitType.Immune:
                    return "is ignored (immunity) by";
            }
        }
        return "?!?!";
    }

    private get_spell_component_localization(component: SpellComponent): string {
        return this.format_number(component[0]) + " (" + school_mask_to_school_array(component[1]).map(school => school.toLowerCase()).join(", ") + ")" +
            this.get_mitigation_localization(component[2], component[3], component[4]);
    }

    private get_mitigation_localization(absorb: number, resist: number, block: number): string {
        const mitigation_str = [];
        if (absorb > 0)
            mitigation_str.push("(" + this.format_number(absorb) + " absorbed)");
        if (resist > 0)
            mitigation_str.push("(" + this.format_number(resist) + " resisted)");
        if (block > 0)
            mitigation_str.push("(" + this.format_number(block) + " blocked)");
        return mitigation_str.length > 0 ? " " + mitigation_str.join(" ") : "";
    }

    format_number(number_str: number | string): string {
        return number_str.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }
}
