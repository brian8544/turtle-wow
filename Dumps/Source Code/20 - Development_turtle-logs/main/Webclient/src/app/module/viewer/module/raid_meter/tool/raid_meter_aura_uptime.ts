import {InstanceDataFilter} from "../../../tool/instance_data_filter";
import {Unit} from "../../../domain_value/unit";
import {commit_aura_uptime} from "../stdlib/aura_uptime";

export class RaidMeterAuraUptime {

    constructor(
        private data_filter: InstanceDataFilter
    ) {
    }

    async calculate(inverse: boolean): Promise<Array<[number, [Unit, Array<[number, Array<[number | undefined, number | undefined, Unit | undefined, Unit | undefined]>]>]]>> {
        return commit_aura_uptime(this.data_filter.get_non_segmented_aura_applications(inverse), this.data_filter.get_segment_intervals());
    }
}
