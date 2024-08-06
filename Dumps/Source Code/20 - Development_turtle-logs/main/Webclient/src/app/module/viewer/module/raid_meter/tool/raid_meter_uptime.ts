import {InstanceDataFilter} from "../../../tool/instance_data_filter";
import {Unit} from "../../../domain_value/unit";
import {commit_uptime} from "../stdlib/uptime";
import {te_heal, te_melee_damage, te_spell_damage} from "../../../extractor/targets";
import {se_heal, se_melee_damage, se_spell_damage} from "../../../extractor/sources";

export class RaidMeterUptime {

    constructor(
        private data_filter: InstanceDataFilter
    ) {
    }

    async calculate(inverse: boolean): Promise<Array<[number, [Unit, Array<[number, number]>]]>> {
        // These event types are in different workers, hence only one of them is not empty
        let melee = this.data_filter.get_melee_damage(inverse);
        let spell = this.data_filter.get_spell_damage(inverse);
        let heal = this.data_filter.get_heal(inverse);

        let container;
        let unit_extractor;

        if (melee.length > 0) {
            container = melee;
            unit_extractor = inverse ? te_melee_damage : se_melee_damage;
        } else if (spell.length > 0) {
            container = spell;
            unit_extractor = inverse ? te_spell_damage : se_spell_damage;
        } else if (heal.length > 0) {
            container = heal;
            unit_extractor = inverse ? te_heal : se_heal;
        }

        return commit_uptime(container, unit_extractor);
    }
}
