import {InstanceDataFilter} from "../../../tool/instance_data_filter";
import {Unit} from "../../../domain_value/unit";
import {UnAuraOverviewRow} from "../module/un_aura_overview/domain_value/un_aura_overview_row";
import {commit_spell_steal} from "../stdlib/spell_steal";
import {te_un_aura} from "../../../extractor/targets";
import {se_un_aura} from "../../../extractor/sources";
import {UnAura} from "../../../domain_value/event";

export class RaidMeterSpellSteal {

    constructor(
        private data_filter: InstanceDataFilter
    ) {
    }

    async calculate(inverse: boolean): Promise<Array<[number, [Unit, Array<UnAuraOverviewRow>]]>> {
        if (inverse)
            return commit_spell_steal(this.data_filter.get_spell_steals(true) as Array<UnAura>, te_un_aura);
        return commit_spell_steal(this.data_filter.get_spell_steals(false) as Array<UnAura>, se_un_aura);
    }
}
