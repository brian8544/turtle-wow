import {Event} from "../domain_value/event";
import {get_unit_id, Unit} from "../domain_value/unit";
import {
    se_aura_application, se_combat_state, se_death,
    se_heal,
    se_interrupt, se_loot, se_melee_damage, se_position, se_power, se_spell_cast,
    se_spell_damage,
    se_summon, se_threat, se_threat_wipe, se_un_aura
} from "../extractor/sources";
import {
    te_aura_application, te_heal, te_interrupt, te_melee_damage,
    te_spell_cast,
    te_spell_damage, te_summon, te_threat, te_un_aura
} from "../extractor/targets";
import {
    ae_aura_application, ae_heal,
    ae_interrupt,
    ae_melee_damage,
    ae_spell_cast, ae_spell_damage, ae_threat, ae_un_aura
} from "../extractor/abilities";
import {KnechtUpdates} from "../domain_value/knecht_updates";
import {Subject} from "rxjs";
import {debounceTime} from "rxjs/operators";

export class InstanceDataLoader {
    private static readonly UPDATE_INTERVAL: number = 60000;
    private static readonly BATCH_SIZE: number = 63000;
    private static readonly INSTANCE_EXPORT_URL: string = "/API/instance/export/:instance_meta_id/:event_type/:last_event_id";

    public spell_casts: Array<Event> = [];
    public aura_applications: Array<Event> = [];
    public melee_damage: Array<Event> = [];
    public deaths: Array<Event> = [];
    public combat_states: Array<Event> = [];
    public loot: Array<Event> = [];
    public positions: Array<Event> = [];
    public powers: Array<Event> = [];
    public interrupts: Array<Event> = [];
    public spell_steals: Array<Event> = [];
    public dispels: Array<Event> = [];
    public threat_wipes: Array<Event> = [];
    public summons: Array<Event> = [];
    public spell_damage: Array<Event> = [];
    public heal: Array<Event> = [];
    public threat: Array<Event> = [];

    public sources: Map<number, [Unit, Array<[number, number]>]> = new Map();
    public targets: Map<number, [Unit, Array<[number, number]>]> = new Map();
    public abilities: Map<number, [number, Array<[number, number]>]> = new Map();

    public initialized: boolean = false;

    private newData$: Subject<void> = new Subject();
    private new_data_event_types: Set<number> = new Set();

    private container_getter: Map<number, [() => Array<Event>, (Event) => Unit, (Event) => Unit, (Event) => number | Array<number>]> = new Map([
        [0, [() => this.spell_casts, se_spell_cast, te_spell_cast, ae_spell_cast]],
        [1, [() => this.deaths, se_death, undefined, undefined]],
        [2, [() => this.combat_states, se_combat_state, undefined, undefined]],
        [3, [() => this.loot, se_loot, undefined, undefined]],
        [4, [() => this.positions, se_position, undefined, undefined]],
        [5, [() => this.powers, se_power, undefined, undefined]],
        [6, [() => this.aura_applications, se_aura_application, te_aura_application, ae_aura_application]],
        [7, [() => this.interrupts, se_interrupt, te_interrupt, ae_interrupt]],
        [8, [() => this.spell_steals, se_un_aura, te_un_aura, ae_un_aura]],
        [9, [() => this.dispels, se_un_aura, te_un_aura, ae_un_aura]],
        [10, [() => this.threat_wipes, se_threat_wipe, undefined, undefined]],
        [11, [() => this.summons, se_summon, te_summon, undefined]],
        [12, [() => this.melee_damage, se_melee_damage, te_melee_damage, ae_melee_damage]],
        [13, [() => this.spell_damage, se_spell_damage, te_spell_damage, ae_spell_damage]],
        [14, [() => this.heal, se_heal, te_heal, ae_heal]],
        [15, [() => this.threat, se_threat, te_threat, ae_threat]],
    ]);

    constructor(private instance_meta_id: number, is_expired: boolean, event_types: Array<number>) {
        this.newData$.asObservable().pipe(debounceTime(500))
            .subscribe(() => {
                // Currently not needed, cause we dont have live updates
                // The debounce causes a newData event to be issued after initialized was send, causing 2 updates
                // (self as any).postMessage(["KNECHT_UPDATES", KnechtUpdates.NewData, [...this.new_data_event_types.values()]]);
                this.new_data_event_types = new Set();
            });
        this.load_data(event_types)
            .finally(() => {
                // DISABLED ATM
                /*
                if (!is_expired) {
                    setInterval(() =>
                        this.load_data(event_types), InstanceDataLoader.UPDATE_INTERVAL);
                }
                 */
            });
    }

    private extract_subjects(event_type: number, event: Event): void {
        const getter = this.container_getter.get(event_type);
        const source = getter[1](event);
        const source_id = get_unit_id(source, false);

        if (!this.sources.has(source_id))
            this.sources.set(source_id, [source, []]);
        this.append_subject_interval(this.sources.get(source_id), event[1]);

        if (!!getter[2]) {
            const target = getter[2](event);
            if (!!target) {
                const target_id = get_unit_id(target, false);
                if (!this.targets.has(target_id))
                    this.targets.set(target_id, [target, []]);
                this.append_subject_interval(this.targets.get(target_id), event[1]);
            }
        }

        if (!!getter[3]) {
            const abilities = getter[3](event);
            if (abilities !== undefined && abilities !== null) {
                if (abilities instanceof Array) {
                    for (const ability_id of abilities) {
                        if (ability_id >= 0) {
                            if (!this.abilities.has(ability_id))
                                this.abilities.set(ability_id, [ability_id, []]);
                            this.append_subject_interval(this.abilities.get(ability_id), event[1], event_type === 6 ? 8000 * 1000 : 2500);
                        }
                    }
                } else {
                    if (abilities >= 0) {
                        if (!this.abilities.has(abilities))
                            this.abilities.set(abilities, [abilities, []]);
                        this.append_subject_interval(this.abilities.get(abilities), event[1], event_type === 6 ? 8000 * 1000 : 2500);
                    }
                }
            }
        }
    }

    private append_subject_interval(interval_holder: [any, Array<[number, number]>], timestamp: number, interval_threshold: number = 2500): void {
        const intervals = interval_holder[1];
        if (intervals.length === 0) {
            intervals.push([timestamp, timestamp]);
            return;
        }

        let prev_interval_index = -1;
        for (let i = intervals.length - 1; i >= 0; --i) {
            if (intervals[i][1] <= timestamp) {
                prev_interval_index = i;
                break;
            }
        }

        if (prev_interval_index === -1) { // We lower than all
            const first_interval = intervals[0];
            if (first_interval[0] > timestamp && first_interval[0] - timestamp <= interval_threshold) first_interval[0] = timestamp;
            else interval_holder[1] = [[timestamp, timestamp], ...intervals];
        } else if (prev_interval_index + 1 === intervals.length) { // We are greater than all
            const last_interval = intervals[prev_interval_index];
            if (timestamp - last_interval[1] <= interval_threshold) last_interval[1] = timestamp;
            else intervals.push([timestamp, timestamp]);
        } else { // We are between two intervals
            const prev_interval = intervals[prev_interval_index];
            const next_interval = intervals[prev_interval_index + 1];
            if (timestamp - prev_interval[1] <= interval_threshold) {
                if (next_interval[0] - timestamp <= interval_threshold) {
                    prev_interval[1] = next_interval[1];
                    interval_holder[1] = [...intervals.slice(0, prev_interval_index + 1), ...intervals.slice(prev_interval_index + 2)];
                } else {
                    prev_interval[1] = timestamp;
                }
            } else {
                if (next_interval[0] - timestamp <= interval_threshold) next_interval[0] = timestamp;
                else intervals.push([timestamp, timestamp]);
            }
        }
    }

    private async load_data(event_types: Array<number>): Promise<void> {
        for (const event_type of event_types)
            await this.load_ressource(event_type);
        if (!this.initialized) {
            this.initialized = true;
            (self as any).postMessage(["KNECHT_UPDATES", KnechtUpdates.Initialized]);
        }
    }

    private async load_ressource(event_type: number): Promise<void> {
        let container = this.container_getter.get(event_type)[0]();
        const container_length = container.length;
        const last_event_id = container_length === 0 ? 0 : container[container_length - 1][0];
        const result = await this.load_instance_data(event_type, last_event_id);
        result.forEach(event => this.extract_subjects(event_type, event));
        for (let i=0; i<Math.ceil(result.length/InstanceDataLoader.BATCH_SIZE); ++i)
            container.push(...result.slice(i * InstanceDataLoader.BATCH_SIZE, (i+1) * InstanceDataLoader.BATCH_SIZE));
        if (result.length > 0) {
            this.new_data_event_types.add(event_type);
            this.newData$.next();
        }
    }

    private async load_instance_data(event_type: number, last_event_id: number): Promise<Array<Event>> {
        return await (await fetch(InstanceDataLoader.INSTANCE_EXPORT_URL
            .replace(":instance_meta_id", this.instance_meta_id.toString())
            .replace(":event_type", event_type.toString())
            .replace(":last_event_id", last_event_id.toString()))).json();
    }
}
