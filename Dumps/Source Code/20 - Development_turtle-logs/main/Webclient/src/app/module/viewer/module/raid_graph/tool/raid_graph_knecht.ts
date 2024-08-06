import {InstanceDataFilter} from "../../../tool/instance_data_filter";
import {DataSet, is_event_data_set} from "../domain_value/data_set";
import {Event} from "../../../domain_value/event";
import {get_spell_components_total_amount} from "../../../domain_value/damage";
import {Unit} from "../../../domain_value/unit";
import {se_death, se_interrupt, se_spell_cast, se_un_aura} from "../../../extractor/sources";
import {te_interrupt, te_un_aura} from "../../../extractor/targets";
import {
    ae_heal,
    ae_melee_damage,
    ae_spell_cast,
    ae_spell_damage,
    ae_threat,
    ae_un_aura
} from "../../../extractor/abilities";

export class RaidGraphKnecht {
    private static readonly MAX_DATA_POINTS: number = 300;
    private static readonly DEFAULT_SQUASH_TIME_IN_MS: number = 100;
    private static readonly SQUASH_TIME_MULTIPLIER: number = 1.5;

    constructor(
        private data_filter: InstanceDataFilter
    ) {
    }

    static __squash(res_data_points: Array<[number, number, Array<[number, number]>]>): Array<[number, number, Array<[number, number]>]> {
        if (res_data_points.length < this.MAX_DATA_POINTS)
            return res_data_points;

        let result = new Map();
        let squash_time = this.DEFAULT_SQUASH_TIME_IN_MS;
        while (res_data_points.length > this.MAX_DATA_POINTS) {
            result = new Map<number, [number, Map<number, number>]>();
            const half_squash_time = Math.round(squash_time / 2);
            let current_first_timestamp = res_data_points[0][0];
            for (const [timestamp, amount, ab_arr] of res_data_points) {
                if (timestamp - current_first_timestamp > squash_time)
                    current_first_timestamp = timestamp;
                const key_ts = current_first_timestamp + half_squash_time;
                if (result.has(key_ts)) {
                    const [acc_amount, ab_map] = result.get(key_ts)
                    for (const [ability_id, ability_amount] of ab_arr) {
                        if (ab_map.has(ability_id)) ab_map.set(ability_id, ab_map.get(ability_id) + ability_amount);
                        else ab_map.set(ability_id, ability_amount);
                    }
                    result.set(key_ts, [acc_amount + amount, ab_map]);
                } else result.set(key_ts, [amount, new Map(ab_arr)]);
            }
            squash_time *= this.SQUASH_TIME_MULTIPLIER;
            res_data_points = [...result.entries()].map(([ts, [amount, ab_map]]) => [ts, amount, [...ab_map.entries()]]);
        }
        return res_data_points;
    }

    static squash(data_points: Array<[number, number, number]>): Array<[number, number, Array<[number, number]>]> {
        let res_data_points: Array<[number, number, Array<[number, number]>]> = data_points.map(point => [point[0], point[1], [[point[2], point[1]]]])
        return this.__squash(res_data_points);
    }

    private static feed_points(events: Array<Event>, extract_amount: (Event) => number | Unit, extract_ability: (Event) => number): Array<[number, number | Unit, number]> {
        const result = [];
        for (const event of events)
            result.push([event[1], extract_amount(event), extract_ability(event)]);
        return result;
    }

    async get_data_set(data_set: DataSet): Promise<Array<[number, number | Unit, Array<[number, number]>]>> {
        const data_points = this.extract_data_points(data_set);
        if (is_event_data_set(data_set)) {
            // Ignoring because for events the ability is always 0
            // @ts-ignore
            return data_points;
        }
        return RaidGraphKnecht.squash(data_points as Array<[number, number, number]>);
    }

    private extract_data_points(data_set: DataSet): Array<[number, number | Unit, number]> {
        return (() => {
            switch (data_set) {
                case DataSet.DamageDone:
                case DataSet.DamageTaken:
                    return [...RaidGraphKnecht.feed_points(this.data_filter.get_melee_damage(data_set === DataSet.DamageTaken),
                        (event) => get_spell_components_total_amount(event[5]), (event) => ae_melee_damage()),
                        ...RaidGraphKnecht.feed_points(this.data_filter.get_spell_damage(data_set === DataSet.DamageTaken),
                            (event) => get_spell_components_total_amount(event[7]), ae_spell_damage)];
                case DataSet.TotalHealingDone:
                case DataSet.TotalHealingTaken:
                    return RaidGraphKnecht.feed_points(this.data_filter.get_heal(data_set === DataSet.TotalHealingTaken), (event) => event[8], ae_heal);
                case DataSet.EffectiveHealingDone:
                case DataSet.EffectiveHealingTaken:
                    return RaidGraphKnecht.feed_points(this.data_filter.get_heal(data_set === DataSet.EffectiveHealingTaken), (event) => event[9], ae_heal);
                case DataSet.OverhealingDone:
                case DataSet.OverhealingTaken:
                    return RaidGraphKnecht.feed_points(this.data_filter.get_heal(data_set === DataSet.OverhealingTaken), (event) => event[8] - event[9], ae_heal);
                case DataSet.ThreatDone:
                case DataSet.ThreatTaken:
                    return RaidGraphKnecht.feed_points(this.data_filter.get_threat(data_set === DataSet.ThreatTaken), (event) => event[8], ae_threat);
                case DataSet.Deaths:
                case DataSet.Kills:
                    return RaidGraphKnecht.feed_points(this.data_filter.get_deaths(data_set === DataSet.Kills), (event) => se_death(event), (event) => 0);
                case DataSet.DispelsDone:
                case DataSet.DispelsReceived:
                    return RaidGraphKnecht.feed_points(this.data_filter.get_dispels(data_set === DataSet.DispelsReceived), (event) => {
                        if (data_set === DataSet.DispelsReceived) {
                            return te_un_aura(event);
                        }
                        return se_un_aura(event);
                    }, (event) => ae_un_aura(event)[0]);
                case DataSet.InterruptDone:
                case DataSet.InterruptReceived:
                    return RaidGraphKnecht.feed_points(this.data_filter.get_interrupts(data_set === DataSet.InterruptReceived), (event) => {
                        if (data_set === DataSet.InterruptReceived) {
                            return te_interrupt(event);
                        }
                        return se_interrupt(event);
                    }, (event) => ae_un_aura(event)[0]);
                case DataSet.SpellStealDone:
                case DataSet.SpellStealReceived:
                    return RaidGraphKnecht.feed_points(this.data_filter.get_spell_steals(data_set === DataSet.SpellStealReceived), (event) => {
                        if (data_set === DataSet.SpellStealReceived) {
                            return te_un_aura(event);
                        }
                        return se_un_aura(event);
                    }, (event) => ae_un_aura(event)[0]);
                case DataSet.SpellCasts:
                    return RaidGraphKnecht.feed_points(this.data_filter.get_spell_casts(false), se_spell_cast, ae_spell_cast);
            }
            return [];
        })().sort((left, right) => left[0] - right[0]);
    }
}
