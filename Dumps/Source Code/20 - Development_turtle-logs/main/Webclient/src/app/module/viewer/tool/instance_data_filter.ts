import {InstanceDataLoader} from "./instance_data_loader";
import {Event} from "../domain_value/event";
import {get_creature_entry, get_unit_id, is_player, player_id_or_npc_id, Unit} from "../domain_value/unit";
import {
    se_aura_application,
    se_combat_state,
    se_death,
    se_heal,
    se_interrupt,
    se_loot,
    se_melee_damage,
    se_position,
    se_power,
    se_spell_cast,
    se_spell_damage,
    se_summon,
    se_threat,
    se_threat_wipe,
    se_un_aura
} from "../extractor/sources";
import {
    te_aura_application,
    te_death,
    te_heal,
    te_interrupt,
    te_melee_damage,
    te_spell_cast,
    te_spell_damage,
    te_summon,
    te_threat,
    te_un_aura
} from "../extractor/targets";
import {
    ae_aura_application,
    ae_heal,
    ae_interrupt,
    ae_melee_damage,
    ae_spell_cast,
    ae_spell_damage,
    ae_threat,
    ae_un_aura
} from "../extractor/abilities";
import {Preset} from "../module/raid_configuration_menu/module/raid_browser/domain_value/preset";
import {iterable_filter} from "../../../stdlib/iterable_higher_order";
import {hm_heal, hm_melee_damage, hm_spell_cast, hm_spell_damage, hm_threat} from "../extractor/hit_types";

export class InstanceDataFilter {

    private segment_intervals$: Array<[number, number]> = [];
    private source_filter$: Set<number> = new Set();
    private target_filter$: Set<number> = new Set();
    private ability_filter$: Set<number> = new Set();
    private time_boundaries$: [number, number] = [0, 1];
    private presets$: Array<Preset> = [];

    private data_loader: InstanceDataLoader;
    private cache: Map<string, Array<Event>> = new Map();

    constructor(instance_meta_id: number, is_expired: boolean, event_types: Array<number>) {
        this.data_loader = new InstanceDataLoader(instance_meta_id, is_expired, event_types);
    }

    private apply_filter(event_type: number, container: Array<Event>, source_extraction: [(Event) => Unit, boolean], target_extraction: [(Event) => Unit, boolean],
                         multi_ability_extraction: (Event) => Array<number>, single_ability_extraction: (Event) => number, hit_mask_extraction: (Event) => number,
                         inverse_filter: boolean = false, skip_time_and_attempt_filter: boolean = false, skip_target_filter: boolean = false): Array<Event> {
        const presets_with_event_type: Array<Preset> = this.presets$.filter(preset => preset.event_types.includes(event_type) || preset.event_types.includes(-1));
        if (presets_with_event_type.length === 0 && this.presets$.length > 0)
            return [];

        const has_everything_source_preset_tmp = presets_with_event_type.some(preset => preset.sources.includes(-1));
        const has_everything_target_preset_tmp = presets_with_event_type.some(preset => preset.targets.includes(-1));
        const has_players_source_preset_tmp = presets_with_event_type.some(preset => preset.sources.includes(-2));
        const has_players_target_preset_tmp = presets_with_event_type.some(preset => preset.targets.includes(-2));
        const has_creatures_source_preset_tmp = presets_with_event_type.some(preset => preset.sources.includes(-3));
        const has_creatures_target_preset_tmp = presets_with_event_type.some(preset => preset.targets.includes(-3));

        const has_everything_source_preset = this.presets$.length === 0 || (inverse_filter ? has_everything_target_preset_tmp : has_everything_source_preset_tmp);
        const has_everything_target_preset = this.presets$.length === 0 || (inverse_filter ? has_everything_source_preset_tmp : has_everything_target_preset_tmp);
        const has_players_source_preset = this.presets$.length === 0 || (inverse_filter ? has_players_target_preset_tmp : has_players_source_preset_tmp);
        const has_players_target_preset = this.presets$.length === 0 || (inverse_filter ? has_players_source_preset_tmp : has_players_target_preset_tmp);
        const has_creatures_source_preset = this.presets$.length === 0 || (inverse_filter ? has_creatures_target_preset_tmp : has_creatures_source_preset_tmp);
        const has_creatures_target_preset = this.presets$.length === 0 || (inverse_filter ? has_creatures_source_preset_tmp : has_creatures_target_preset_tmp);

        const has_everything_abilities_preset = this.presets$.length === 0 || presets_with_event_type.some(preset => preset.abilities.includes(-1));
        const has_everything_hit_types_preset = this.presets$.length === 0 || presets_with_event_type.some(preset => preset.hit_types.includes(-1));

        const cache_key = event_type.toString() + (inverse_filter ? "1" : "0") + this.presets$.map(preset => preset.name).join(",");
        if (this.cache.has(cache_key))
            return this.cache.get(cache_key);

        const filter_source = inverse_filter ? this.target_filter$ : this.source_filter$;
        const filter_target = inverse_filter ? this.source_filter$ : this.target_filter$;
        const filter_source_preset = inverse_filter ? presets_with_event_type.map(preset => preset.targets) : presets_with_event_type.map(preset => preset.sources);
        const filter_target_preset = inverse_filter ? presets_with_event_type.map(preset => preset.sources) : presets_with_event_type.map(preset => preset.targets);

        let result = container;
        if (!skip_time_and_attempt_filter) {
            result = result.filter(event => this.time_boundaries$[0] <= event[1] && this.time_boundaries$[1] >= event[1]);
            result = result.filter(event => this.segment_intervals$.find(interval => {
                return interval[0] <= event[1] && interval[1] >= event[1];
            }) !== undefined);
        }
        if (!(inverse_filter && skip_target_filter)) {
            result = result.filter(event => {
                const unit = source_extraction[0](event);
                const unit_id = get_unit_id(unit, source_extraction[1]);
                const unit_is_player = is_player(unit, source_extraction[1]);
                const preset_id = unit_is_player ? unit_id : get_creature_entry(unit, source_extraction[1]);
                // if (unit_id === 0) return true;
                return filter_source.has(unit_id) && (has_everything_source_preset || (has_players_source_preset && unit_is_player)
                    || (has_creatures_source_preset && !unit_is_player) || filter_source_preset.some(filter => filter.includes(preset_id)));
            });
        }
        if (!(!inverse_filter && skip_target_filter)) {
            if (!!target_extraction)
                result = result.filter(event => {
                    const unit = target_extraction[0](event);
                    const unit_id = get_unit_id(unit, target_extraction[1]);
                    if (unit_id === 0)
                        return true;
                    const unit_is_player = is_player(unit, target_extraction[1]);
                    const preset_id = unit_is_player ? unit_id : get_creature_entry(unit, target_extraction[1]);
                    return filter_target.has(unit_id) && (has_everything_target_preset || (has_players_target_preset && unit_is_player)
                        || (has_creatures_target_preset && !unit_is_player) || filter_target_preset.some(filter => filter.includes(preset_id)));
                });
        }
        if (!!multi_ability_extraction)
            result = result.filter(event => multi_ability_extraction(event).every(ability => this.ability_filter$.has(ability)
                && (has_everything_abilities_preset || presets_with_event_type.some(preset => preset.abilities.includes(ability)))));
        if (!!single_ability_extraction)
            result = result.filter(event => {
                const ability_id = single_ability_extraction(event);
                return this.ability_filter$.has(ability_id)
                    && (has_everything_abilities_preset || presets_with_event_type.some(preset => preset.abilities.includes(ability_id)));
            });

        if (presets_with_event_type.length > 0 && !!hit_mask_extraction && !has_everything_hit_types_preset) {
            const flattened_hit_types = presets_with_event_type.reduce((acc, preset) => preset.hit_types.reduce((i_acc, ht) => i_acc | ht, acc), 0);
            result = result.filter(event => {
                const hit_mask = hit_mask_extraction(event);
                return (flattened_hit_types & hit_mask) > 0;
            });
        }

        this.cache.set(cache_key, result);
        return result;
    }

    async set_preset_filter(presets: Array<Preset>): Promise<void> {
        this.cache = new Map();
        this.presets$ = presets;
    }

    async set_segment_intervals(intervals: Array<[number, number]>): Promise<void> {
        this.cache = new Map();
        this.segment_intervals$ = intervals;
    }

    async set_source_filter(sources: Array<number>): Promise<void> {
        if (sources.length !== this.source_filter$.size || sources.some(source => !this.source_filter$.has(source))) {
            this.cache = new Map();
            this.source_filter$ = new Set(sources);
        }
    }

    async set_target_filter(targets: Array<number>): Promise<void> {
        if (targets.length !== this.target_filter$.size || targets.some(target => !this.target_filter$.has(target))) {
            this.cache = new Map();
            this.target_filter$ = new Set(targets);
        }
    }

    async set_ability_filter(abilities: Array<number>): Promise<void> {
        if (abilities.length !== this.ability_filter$.size || abilities.some(ability => !this.ability_filter$.has(ability))) {
            this.cache = new Map();
            this.ability_filter$ = new Set(abilities);
        }
    }

    async set_time_boundaries(boundaries: [number, number]): Promise<void> {
        if (this.time_boundaries$[0] === boundaries[0] && this.time_boundaries$[1] === boundaries[1])
            return;
        this.cache = new Map();
        this.time_boundaries$ = boundaries;
    }

    async get_sources(): Promise<Map<number, [Unit, Array<[number, number]>]>> {
        const has_everything = this.presets$.some(preset => preset.sources.includes(-1)) || this.presets$.length === 0;
        const has_players = this.presets$.some(preset => preset.sources.includes(-2)) || this.presets$.length === 0;
        const has_creatures = this.presets$.some(preset => preset.sources.includes(-3)) || this.presets$.length === 0;
        return new Map(iterable_filter(this.data_loader.sources.entries(), ([key, val]) => {
            const unit_is_player = is_player(val[0]);
            return has_everything || (has_players && unit_is_player) || (has_creatures && !unit_is_player)
                || this.presets$.some(preset => preset.sources.includes(player_id_or_npc_id(val[0])));
        }));
    }

    async get_targets(): Promise<Map<number, [Unit, Array<[number, number]>]>> {
        const has_everything = this.presets$.some(preset => preset.targets.includes(-1)) || this.presets$.length === 0;
        const has_players = this.presets$.some(preset => preset.targets.includes(-2)) || this.presets$.length === 0;
        const has_creatures = this.presets$.some(preset => preset.targets.includes(-3)) || this.presets$.length === 0;
        return new Map(iterable_filter(this.data_loader.targets.entries(), ([key, val]) => {
            const unit_is_player = is_player(val[0]);
            return has_everything || (has_players && unit_is_player) || (has_creatures && !unit_is_player)
                || this.presets$.some(preset => preset.targets.includes(player_id_or_npc_id(val[0])));
        }));
    }

    async get_abilities(): Promise<Map<number, [number, Array<[number, number]>]>> {
        const has_everything = this.presets$.some(preset => preset.abilities.includes(-1)) || this.presets$.length === 0;
        return new Map(iterable_filter(this.data_loader.abilities.entries(), ([key,]) => has_everything || this.presets$.some(preset => preset.abilities.includes(key))));
    }

    get_spell_casts(inverse_filter: boolean = false): Array<Event> {
        if (!this.data_loader.initialized) return [];
        return this.apply_filter(0, this.data_loader.spell_casts, [se_spell_cast, true],
            [te_spell_cast, false], undefined, ae_spell_cast, hm_spell_cast, inverse_filter);
    }

    get_deaths(inverse_filter: boolean = false): Array<Event> {
        if (!this.data_loader.initialized) return [];
        return this.apply_filter(1, this.data_loader.deaths, [se_death, false],
            [te_death, false], undefined, undefined, undefined, inverse_filter);
    }

    get_combat_states(inverse_filter: boolean = false): Array<Event> {
        if (!this.data_loader.initialized) return [];
        return this.apply_filter(2, this.data_loader.combat_states, [se_combat_state, false],
            undefined, undefined, undefined, undefined, inverse_filter);
    }

    get_loot(inverse_filter: boolean = false): Array<Event> {
        if (!this.data_loader.initialized) return [];
        return this.apply_filter(3, this.data_loader.loot, [se_loot, false],
            undefined, undefined, undefined, undefined, inverse_filter, true);
    }

    get_positions(inverse_filter: boolean = false): Array<Event> {
        if (!this.data_loader.initialized) return [];
        return this.apply_filter(4, this.data_loader.positions, [se_position, false],
            undefined, undefined, undefined, undefined, inverse_filter);
    }

    get_powers(inverse_filter: boolean = false): Array<Event> {
        if (!this.data_loader.initialized) return [];
        return this.apply_filter(5, this.data_loader.powers, [se_power, false],
            undefined, undefined, undefined, undefined, inverse_filter);
    }

    get_aura_applications(inverse_filter: boolean = false): Array<Event> {
        if (!this.data_loader.initialized) return [];
        return this.apply_filter(6, this.data_loader.aura_applications, [se_aura_application, false],
            [te_aura_application, false], undefined, ae_aura_application, undefined, inverse_filter);
    }

    get_interrupts(inverse_filter: boolean = false): Array<Event> {
        if (!this.data_loader.initialized) return [];
        return this.apply_filter(7, this.data_loader.interrupts, [se_interrupt, true],
            [te_interrupt, false], ae_interrupt, undefined, undefined, inverse_filter);
    }

    get_spell_steals(inverse_filter: boolean = false): Array<Event> {
        if (!this.data_loader.initialized) return [];
        return this.apply_filter(8, this.data_loader.spell_steals, [se_un_aura, true],
            [te_un_aura, false], ae_un_aura, undefined, undefined, inverse_filter);
    }

    get_dispels(inverse_filter: boolean = false): Array<Event> {
        if (!this.data_loader.initialized) return [];
        return this.apply_filter(9, this.data_loader.dispels, [se_un_aura, true],
            [te_un_aura, false], ae_un_aura, undefined, undefined, inverse_filter);
    }

    get_threat_wipes(inverse_filter: boolean = false): Array<Event> {
        if (!this.data_loader.initialized) return [];
        return this.apply_filter(10, this.data_loader.threat_wipes, [se_threat_wipe, false],
            undefined, undefined, undefined, undefined, inverse_filter);
    }

    get_summons(inverse_filter: boolean = false): Array<Event> {
        if (!this.data_loader.initialized) return [];
        return this.apply_filter(11, this.data_loader.summons, [se_summon, false],
            [te_summon, false], undefined, undefined, undefined, inverse_filter);
    }

    get_melee_damage(inverse_filter: boolean = false, skip_target_filter: boolean = false): Array<Event> {
        if (!this.data_loader.initialized) return [];
        return this.apply_filter(12, this.data_loader.melee_damage, [se_melee_damage, true],
            [te_melee_damage, false], undefined, ae_melee_damage, hm_melee_damage,
            inverse_filter, false, skip_target_filter);
    }

    get_spell_damage(inverse_filter: boolean = false, skip_target_filter: boolean = false): Array<Event> {
        if (!this.data_loader.initialized) return [];
        return this.apply_filter(13, this.data_loader.spell_damage, [se_spell_damage, true],
            [te_spell_damage, false], undefined, ae_spell_damage, hm_spell_damage,
            inverse_filter, false, skip_target_filter);
    }

    get_heal(inverse_filter: boolean = false): Array<Event> {
        if (!this.data_loader.initialized) return [];
        return this.apply_filter(14, this.data_loader.heal, [se_heal, true],
            [te_heal, false], undefined, ae_heal, hm_heal, inverse_filter);
    }

    get_threat(inverse_filter: boolean = false): Array<Event> {
        if (!this.data_loader.initialized) return [];
        return this.apply_filter(15, this.data_loader.threat, [se_threat, false],
            [te_threat, false], undefined, ae_threat, hm_threat, inverse_filter);
    }

    get_non_segmented_aura_applications(inverse_filter: boolean = false): Array<Event> {
        if (!this.data_loader.initialized) return [];
        const filter_source = inverse_filter ? this.target_filter$ : this.source_filter$;
        return this.data_loader.aura_applications.filter(event => filter_source.has(get_unit_id(se_aura_application(event), false)))
            .filter(event => this.ability_filter$.has(ae_aura_application(event)));
    }

    get_segment_intervals(): Array<[number, number]> {
        return this.segment_intervals$;
    }
}
