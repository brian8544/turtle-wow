import {InstanceDataFilter} from "../../../tool/instance_data_filter";
import {te_spell_cast} from "../../../extractor/targets";
import {Unit} from "../../../domain_value/unit";
import {se_spell_cast} from "../../../extractor/sources";
import {SpellCast} from "../../../domain_value/event";
import {commit_spell_cast} from "../stdlib/spell_cast";

export class RaidMeterSpellCast {

    constructor(
        private data_filter: InstanceDataFilter
    ) {
    }

    async calculate(inverse: boolean): Promise<Array<[number, [Unit, Array<[number, number]>]]>> {
        if (inverse)
            return commit_spell_cast(this.data_filter.get_spell_casts(true) as Array<SpellCast>, te_spell_cast);
        return commit_spell_cast(this.data_filter.get_spell_casts(false) as Array<SpellCast>, se_spell_cast);
    }
}
