import {InstanceDataFilter} from "./instance_data_filter";
import {Unit} from "../domain_value/unit";
import {RaidMeterKnecht} from "../module/raid_meter/tool/raid_meter_knecht";
import {RaidGraphKnecht} from "../module/raid_graph/tool/raid_graph_knecht";
import {DataSet} from "../module/raid_graph/domain_value/data_set";
import {HealMode} from "../domain_value/heal_mode";
import {DeathOverviewRow} from "../module/raid_meter/module/deaths_overview/domain_value/death_overview_row";
import {UnAuraOverviewRow} from "../module/raid_meter/module/un_aura_overview/domain_value/un_aura_overview_row";
import {RaidDetailKnecht} from "../module/raid_detail_table/tool/raid_detail_knecht";
import {HitType} from "../domain_value/hit_type";
import {DetailRow} from "../module/raid_detail_table/domain_value/detail_row";
import {RaidEventLogKnecht} from "../module/raid_event_log/tool/raid_event_log_knecht";
import {Event} from "../domain_value/event";
import {KnechtUpdates} from "../domain_value/knecht_updates";
import {School} from "../domain_value/school";
import {AuraGainOverviewRow} from "../module/raid_meter/domain_value/aura_gain_overview_row";
import {Preset} from "../module/raid_configuration_menu/module/raid_browser/domain_value/preset";

export class Rechenknecht {

    constructor(
        private data_filter: InstanceDataFilter,
        private raid_meter_knecht: RaidMeterKnecht,
        private raid_graph_knecht: RaidGraphKnecht,
        private raid_detail_knecht: RaidDetailKnecht,
        private raid_event_log_knecht: RaidEventLogKnecht
    ) {
    }

    private static send_work_start(): void {
        (self as any).postMessage(["KNECHT_UPDATES", KnechtUpdates.WorkStart]);
    }

    private static send_work_end(): void {
        (self as any).postMessage(["KNECHT_UPDATES", KnechtUpdates.WorkEnd]);
    }

    /*
     * RAID EVENT LOG
     */
    async event_log_spell_cast(inverse: boolean, offset: number = 0, up_to_timestamp: number = 0): Promise<Array<Event>> {
        Rechenknecht.send_work_start();
        const spell_cast_entries = this.raid_event_log_knecht.get_spell_cast_entries(inverse, offset, up_to_timestamp);
        Rechenknecht.send_work_end();
        return spell_cast_entries;
    }

    async event_log_deaths(inverse: boolean, offset: number = 0, up_to_timestamp: number = 0): Promise<Array<Event>> {
        Rechenknecht.send_work_start();
        const deathEntries = this.raid_event_log_knecht.get_death_entries(inverse, offset, up_to_timestamp);
        Rechenknecht.send_work_end();
        return deathEntries;
    }

    async event_log_combat_state(inverse: boolean, offset: number = 0, up_to_timestamp: number = 0): Promise<Array<Event>> {
        Rechenknecht.send_work_start();
        const combat_state_entries = this.raid_event_log_knecht.get_combat_state_entries(inverse, offset, up_to_timestamp);
        Rechenknecht.send_work_end();
        return combat_state_entries;
    }

    async event_log_aura_application(inverse: boolean, offset: number = 0, up_to_timestamp: number = 0): Promise<Array<Event>> {
        Rechenknecht.send_work_start();
        const aura_application_entries = this.raid_event_log_knecht.get_aura_application_entries(inverse, offset, up_to_timestamp);
        Rechenknecht.send_work_end();
        return aura_application_entries;
    }

    async event_log_interrupt(inverse: boolean, offset: number = 0, up_to_timestamp: number = 0): Promise<Array<Event>> {
        Rechenknecht.send_work_start();
        const interrupt_entries = this.raid_event_log_knecht.get_interrupt_entries(inverse, offset, up_to_timestamp);
        Rechenknecht.send_work_end();
        return interrupt_entries;
    }

    async event_log_spell_steal(inverse: boolean, offset: number = 0, up_to_timestamp: number = 0): Promise<Array<Event>> {
        Rechenknecht.send_work_start();
        const spell_steal_entries = this.raid_event_log_knecht.get_spell_steal_entries(inverse, offset, up_to_timestamp);
        Rechenknecht.send_work_end();
        return spell_steal_entries;
    }

    async event_log_dispel(inverse: boolean, offset: number = 0, up_to_timestamp: number = 0): Promise<Array<Event>> {
        Rechenknecht.send_work_start();
        const dispel_entries = this.raid_event_log_knecht.get_dispel_entries(inverse, offset, up_to_timestamp);
        Rechenknecht.send_work_end();
        return dispel_entries;
    }

    async event_log_melee_damage(inverse: boolean, offset: number = 0, up_to_timestamp: number = 0): Promise<Array<Event>> {
        Rechenknecht.send_work_start();
        const meleeDamageEntries = this.raid_event_log_knecht.get_melee_damage_entries(inverse, offset, up_to_timestamp);
        Rechenknecht.send_work_end();
        return meleeDamageEntries;
    }

    async event_log_spell_damage(inverse: boolean, offset: number = 0, up_to_timestamp: number = 0): Promise<Array<Event>> {
        Rechenknecht.send_work_start();
        const spellDamageEntries = this.raid_event_log_knecht.get_spell_damage_entries(inverse, offset, up_to_timestamp);
        Rechenknecht.send_work_end();
        return spellDamageEntries;
    }

    async event_log_heal(inverse: boolean, offset: number = 0, up_to_timestamp: number = 0): Promise<Array<Event>> {
        Rechenknecht.send_work_start();
        const healEntries = this.raid_event_log_knecht.get_heal_entries(inverse, offset, up_to_timestamp);
        Rechenknecht.send_work_end();
        return healEntries;
    }

    /*
     * RAID DETAIL
     */
    async detail_damage(inverse: boolean): Promise<Array<[number, Array<[number, Array<[HitType, DetailRow]>]>]>> {
        Rechenknecht.send_work_start();
        const detailDamage = this.raid_detail_knecht.damage.calculate(inverse);
        Rechenknecht.send_work_end();
        return detailDamage;
    }

    async detail_heal(heal_mode: HealMode, inverse: boolean): Promise<Array<[number, Array<[number, Array<[HitType, DetailRow]>]>]>> {
        Rechenknecht.send_work_start();
        const detailHeal = this.raid_detail_knecht.heal.calculate(heal_mode, inverse);
        Rechenknecht.send_work_end();
        return detailHeal;
    }

    async detail_threat(inverse: boolean): Promise<Array<[number, Array<[number, Array<[HitType, DetailRow]>]>]>> {
        Rechenknecht.send_work_start();
        const detailThreat = this.raid_detail_knecht.threat.calculate(inverse);
        Rechenknecht.send_work_end();
        return detailThreat;
    }

    /*
     * Tooltip
     */
    async damage_target_summary(inverse: boolean): Promise<Array<[number, Array<[number, number]>]>> {
        Rechenknecht.send_work_start();
        const result = this.raid_detail_knecht.damage.calculate_summary(inverse);
        Rechenknecht.send_work_end();
        return result;
    }

    async heal_target_summary(heal_mode: HealMode, inverse: boolean): Promise<Array<[number, Array<[number, number]>]>> {
        Rechenknecht.send_work_start();
        const result = this.raid_detail_knecht.heal.calculate_summary(heal_mode, inverse);
        Rechenknecht.send_work_end();
        return result;
    }

    async threat_target_summary(inverse: boolean): Promise<Array<[number, Array<[number, number]>]>> {
        Rechenknecht.send_work_start();
        const result = this.raid_detail_knecht.threat.calculate_summary(inverse);
        Rechenknecht.send_work_end();
        return result;
    }

    /*
     * RAID GRAPH
     */
    async graph_data_set(data_set: DataSet): Promise<Array<[number, number | Unit, Array<[number, number]>]>> {
        Rechenknecht.send_work_start();
        const result = this.raid_graph_knecht.get_data_set(data_set);
        Rechenknecht.send_work_end();
        return result;
    }

    /*
     * RAID METER
     */
    async meter_damage(inverse: boolean): Promise<Array<[number, [Unit, Array<[number, number]>]]>> {
        Rechenknecht.send_work_start();
        const meter_damage = this.raid_meter_knecht.damage.calculate(inverse);
        Rechenknecht.send_work_end();
        return meter_damage;
    }

    async meter_heal(heal_mode: HealMode, inverse: boolean): Promise<Array<[number, [Unit, Array<[number, number]>]]>> {
        Rechenknecht.send_work_start();
        const meter_heal = this.raid_meter_knecht.heal.calculate(heal_mode, inverse);
        Rechenknecht.send_work_end();
        return meter_heal;
    }

    async meter_threat(inverse: boolean): Promise<Array<[number, [Unit, Array<[number, number]>]]>> {
        Rechenknecht.send_work_start();
        const meter_threat = this.raid_meter_knecht.threat.calculate(inverse);
        Rechenknecht.send_work_end();
        return meter_threat;
    }

    async meter_death(inverse: boolean): Promise<Array<[number, [Unit, Array<DeathOverviewRow>]]>> {
        Rechenknecht.send_work_start();
        const meter_death = this.raid_meter_knecht.death.calculate(inverse);
        Rechenknecht.send_work_end();
        return meter_death;
    }

    async meter_dispel(inverse: boolean): Promise<Array<[number, [Unit, Array<UnAuraOverviewRow>]]>> {
        Rechenknecht.send_work_start();
        const meter_dispel = this.raid_meter_knecht.dispel.calculate(inverse);
        Rechenknecht.send_work_end();
        return meter_dispel;
    }

    async meter_interrupt(inverse: boolean): Promise<Array<[number, [Unit, Array<UnAuraOverviewRow>]]>> {
        Rechenknecht.send_work_start();
        const meter_interrupt = this.raid_meter_knecht.interrupt.calculate(inverse);
        Rechenknecht.send_work_end();
        return meter_interrupt;
    }

    async meter_spell_steal(inverse: boolean): Promise<Array<[number, [Unit, Array<UnAuraOverviewRow>]]>> {
        Rechenknecht.send_work_start();
        const meter_spell_steal = this.raid_meter_knecht.spell_steal.calculate(inverse);
        Rechenknecht.send_work_end();
        return meter_spell_steal;
    }

    async meter_aura_uptime(inverse: boolean): Promise<Array<[number, [Unit, Array<[number, Array<[number | undefined, number | undefined, Unit | undefined, Unit | undefined]>]>]]>> {
        Rechenknecht.send_work_start();
        const meter_aura_uptime = this.raid_meter_knecht.aura_uptime.calculate(inverse);
        Rechenknecht.send_work_end();
        return meter_aura_uptime;
    }

    async meter_absorbed_damage(): Promise<Array<[number, Array<[number, number, number, Array<School>]>]>> {
        Rechenknecht.send_work_start();
        const meter_absorbed_damage = this.raid_meter_knecht.absorb.calculate();
        Rechenknecht.send_work_end();
        return meter_absorbed_damage;
    }

    async meter_aura_gain(inverse: boolean): Promise<Array<[number, [Unit, Array<AuraGainOverviewRow>]]>> {
        Rechenknecht.send_work_start();
        const meter_aura_gain = this.raid_meter_knecht.aura_gain.calculate(inverse);
        Rechenknecht.send_work_end();
        return meter_aura_gain;
    }

    async meter_spell_casts(inverse: boolean): Promise<Array<[number, [Unit, Array<[number, number]>]]>> {
        Rechenknecht.send_work_start();
        const meter_damage = this.raid_meter_knecht.spell_cast.calculate(inverse);
        Rechenknecht.send_work_end();
        return meter_damage;
    }

    async meter_uptime(inverse: boolean): Promise<Array<[number, [Unit, Array<[number, number]>]]>> {
        Rechenknecht.send_work_start();
        const meter_damage = this.raid_meter_knecht.uptime.calculate(inverse);
        Rechenknecht.send_work_end();
        return meter_damage;
    }

    /*
     * DATA FILTER
     */
    async set_segment_intervals(intervals: Array<[number, number]>): Promise<void> {
        Rechenknecht.send_work_start();
        const segmentIntervals = this.data_filter.set_segment_intervals(intervals);
        Rechenknecht.send_work_end();
        await segmentIntervals;
    }

    async set_source_filter(sources: Array<number>): Promise<void> {
        Rechenknecht.send_work_start();
        const sourceFilter = this.data_filter.set_source_filter(sources);
        Rechenknecht.send_work_end();
        await sourceFilter;
    }

    async set_target_filter(targets: Array<number>): Promise<void> {
        Rechenknecht.send_work_start();
        const targetFilter = this.data_filter.set_target_filter(targets);
        Rechenknecht.send_work_end();
        await targetFilter;
    }

    async set_ability_filter(abilities: Array<number>): Promise<void> {
        Rechenknecht.send_work_start();
        const abilityFilter = this.data_filter.set_ability_filter(abilities);
        Rechenknecht.send_work_end();
        await abilityFilter;
    }

    async set_time_boundaries(boundaries: [number, number]): Promise<void> {
        Rechenknecht.send_work_start();
        const resultFilter = this.data_filter.set_time_boundaries(boundaries);
        Rechenknecht.send_work_end();
        await resultFilter;
    }

    async set_preset_filter(presets: Array<Preset>): Promise<void> {
        Rechenknecht.send_work_start();
        const resultFilter = this.data_filter.set_preset_filter(presets);
        Rechenknecht.send_work_end();
        await resultFilter;
    }

    async get_sources(): Promise<Map<number, [Unit, Array<[number, number]>]>> {
        Rechenknecht.send_work_start();
        const sources = this.data_filter.get_sources();
        Rechenknecht.send_work_end();
        return sources;
    }

    async get_targets(): Promise<Map<number, [Unit, Array<[number, number]>]>> {
        Rechenknecht.send_work_start();
        const targets = this.data_filter.get_targets();
        Rechenknecht.send_work_end();
        return targets;
    }

    async get_abilities(): Promise<Map<number, [number, Array<[number, number]>]>> {
        Rechenknecht.send_work_start();
        const abilities = this.data_filter.get_abilities();
        Rechenknecht.send_work_end();
        return abilities;
    }

    async get_loot(): Promise<Array<Event>> {
        Rechenknecht.send_work_start();
        const loot = this.data_filter.get_loot();
        Rechenknecht.send_work_end();
        return loot;
    }
}

