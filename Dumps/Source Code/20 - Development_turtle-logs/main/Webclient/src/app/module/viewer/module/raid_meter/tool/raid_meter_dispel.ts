import {InstanceDataFilter} from "../../../tool/instance_data_filter";
import {Unit} from "../../../domain_value/unit";
import {te_un_aura} from "../../../extractor/targets";
import {se_un_aura} from "../../../extractor/sources";
import {commit_dispel} from "../stdlib/dispel";
import {UnAuraOverviewRow} from "../module/un_aura_overview/domain_value/un_aura_overview_row";
import {UnAura} from "../../../domain_value/event";

export class RaidMeterDispel {

    constructor(
        private data_filter: InstanceDataFilter
    ) {
    }

    async calculate(inverse: boolean): Promise<Array<[number, [Unit, Array<UnAuraOverviewRow>]]>> {
        if (inverse)
            return commit_dispel(this.data_filter.get_dispels(true) as Array<UnAura>, te_un_aura);
        return commit_dispel(this.data_filter.get_dispels(false) as Array<UnAura>, se_un_aura);
    }
}
