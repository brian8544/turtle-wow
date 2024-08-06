import {InstanceDataFilter} from "../../../tool/instance_data_filter";
import {Unit} from "../../../domain_value/unit";
import {commit_aura_gain} from "../stdlib/aura_gain";
import {AuraGainOverviewRow} from "../domain_value/aura_gain_overview_row";
import {se_aura_application} from "../../../extractor/sources";
import {te_aura_application} from "../../../extractor/targets";

export class RaidMeterAuraGain {

    constructor(
        private data_filter: InstanceDataFilter
    ) {
    }

    async calculate(inverse: boolean): Promise<Array<[number, [Unit, Array<AuraGainOverviewRow>]]>> {
        if (inverse)
            return commit_aura_gain(this.data_filter.get_aura_applications(false), se_aura_application);
        return commit_aura_gain(this.data_filter.get_aura_applications(true), te_aura_application);
    }
}
