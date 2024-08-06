import {InstanceDataFilter} from "../../../tool/instance_data_filter";
import {Event} from "../../../domain_value/event";

export class RaidEventLogKnecht {
    private static readonly PAGE_SIZE: number = 500;

    constructor(
        private data_filter: InstanceDataFilter
    ) {
    }

    private static slice_and_dice(container: Array<Event>, offset: number, up_to_timestamp: number): Array<Event> {
        const result = up_to_timestamp === 0 ? container : container.filter(event => event[1] <= up_to_timestamp);
        if (offset === 0)
            return result.slice(-RaidEventLogKnecht.PAGE_SIZE);
        return result.slice(-(RaidEventLogKnecht.PAGE_SIZE + offset), -offset);
    }

    async get_spell_cast_entries(inverse: boolean, offset: number = 0, up_to_timestamp: number = 0): Promise<Array<Event>> {
        return RaidEventLogKnecht.slice_and_dice(this.data_filter.get_spell_casts(inverse), offset, up_to_timestamp);
    }

    async get_death_entries(inverse: boolean, offset: number = 0, up_to_timestamp: number = 0): Promise<Array<Event>> {
        return RaidEventLogKnecht.slice_and_dice(this.data_filter.get_deaths(inverse), offset, up_to_timestamp);
    }

    async get_combat_state_entries(inverse: boolean, offset: number = 0, up_to_timestamp: number = 0): Promise<Array<Event>> {
        return RaidEventLogKnecht.slice_and_dice(this.data_filter.get_combat_states(inverse), offset, up_to_timestamp);
    }

    async get_aura_application_entries(inverse: boolean, offset: number = 0, up_to_timestamp: number = 0): Promise<Array<Event>> {
        return RaidEventLogKnecht.slice_and_dice(this.data_filter.get_aura_applications(inverse), offset, up_to_timestamp);
    }

    async get_interrupt_entries(inverse: boolean, offset: number = 0, up_to_timestamp: number = 0): Promise<Array<Event>> {
        return RaidEventLogKnecht.slice_and_dice(this.data_filter.get_interrupts(inverse), offset, up_to_timestamp);
    }

    async get_spell_steal_entries(inverse: boolean, offset: number = 0, up_to_timestamp: number = 0): Promise<Array<Event>> {
        return RaidEventLogKnecht.slice_and_dice(this.data_filter.get_spell_steals(inverse), offset, up_to_timestamp);
    }

    async get_dispel_entries(inverse: boolean, offset: number = 0, up_to_timestamp: number = 0): Promise<Array<Event>> {
        return RaidEventLogKnecht.slice_and_dice(this.data_filter.get_dispels(inverse), offset, up_to_timestamp);
    }

    async get_summon_entries(inverse: boolean, offset: number = 0, up_to_timestamp: number = 0): Promise<Array<Event>> {
        return RaidEventLogKnecht.slice_and_dice(this.data_filter.get_summons(inverse), offset, up_to_timestamp);
    }

    async get_melee_damage_entries(inverse: boolean, offset: number = 0, up_to_timestamp: number = 0): Promise<Array<Event>> {
        return RaidEventLogKnecht.slice_and_dice(this.data_filter.get_melee_damage(inverse), offset, up_to_timestamp);
    }

    async get_spell_damage_entries(inverse: boolean, offset: number = 0, up_to_timestamp: number = 0): Promise<Array<Event>> {
        return RaidEventLogKnecht.slice_and_dice(this.data_filter.get_spell_damage(inverse), offset, up_to_timestamp);
    }

    async get_heal_entries(inverse: boolean, offset: number = 0, up_to_timestamp: number = 0): Promise<Array<Event>> {
        return RaidEventLogKnecht.slice_and_dice(this.data_filter.get_heal(inverse), offset, up_to_timestamp);
    }
}
