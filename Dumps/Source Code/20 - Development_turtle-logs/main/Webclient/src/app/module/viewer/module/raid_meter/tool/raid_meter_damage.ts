import {InstanceDataFilter} from "../../../tool/instance_data_filter";
import {commit_damage} from "../stdlib/damage";
import {te_melee_damage, te_spell_damage} from "../../../extractor/targets";
import {Unit} from "../../../domain_value/unit";
import {se_melee_damage, se_spell_damage} from "../../../extractor/sources";
import {MeleeDamage, SpellDamage} from "../../../domain_value/event";

export class RaidMeterDamage {

    constructor(
        private data_filter: InstanceDataFilter
    ) {
    }

    async calculate(inverse: boolean): Promise<Array<[number, [Unit, Array<[number, number]>]]>> {
        if (inverse)
            return commit_damage(this.data_filter.get_melee_damage(true) as Array<MeleeDamage>, this.data_filter.get_spell_damage(true) as Array<SpellDamage>,
                te_melee_damage, te_spell_damage);
        return commit_damage(this.data_filter.get_melee_damage(false) as Array<MeleeDamage>, this.data_filter.get_spell_damage(false) as Array<SpellDamage>,
            se_melee_damage, se_spell_damage);
    }
}
