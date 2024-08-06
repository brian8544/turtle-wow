import {InstanceDataFilter} from "../../../tool/instance_data_filter";
import {Unit} from "../../../domain_value/unit";
import {te_melee_damage, te_spell_damage} from "../../../extractor/targets";
import {commit_absorb_damages} from "../stdlib/absorb";
import {School} from "../../../domain_value/school";

export class RaidMeterAbsorb {

    constructor(
        private data_filter: InstanceDataFilter
    ) {
    }

    async calculate(): Promise<Array<[number, Array<[number, number, number, Array<School>]>]>> {
        return commit_absorb_damages(this.data_filter.get_melee_damage(true, true),
            this.data_filter.get_spell_damage(true, true),
            te_melee_damage, te_spell_damage);
    }
}
