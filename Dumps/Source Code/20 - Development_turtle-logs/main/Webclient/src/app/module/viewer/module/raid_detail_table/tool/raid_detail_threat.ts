import {InstanceDataFilter} from "../../../tool/instance_data_filter";
import {HitType} from "../../../domain_value/hit_type";
import {DetailRow} from "../domain_value/detail_row";
import {commit_threat_detail} from "../stdlib/threat_detail";
import {Threat} from "../../../domain_value/event";
import {commit_threat_summary} from "../stdlib/threat_summary";

export class RaidDetailThreat {

    constructor(
        private data_filter: InstanceDataFilter
    ) {
    }

    async calculate(inverse: boolean): Promise<Array<[number, Array<[number, Array<[HitType, DetailRow]>]>]>> {
        if (inverse)
            return commit_threat_detail(inverse, this.data_filter.get_threat(true) as Array<Threat>);
        return commit_threat_detail(inverse, this.data_filter.get_threat(false) as Array<Threat>);
    }

    async calculate_summary(inverse: boolean): Promise<Array<[number, Array<[number, number]>]>> {
        if (inverse)
            return commit_threat_summary(inverse, this.data_filter.get_threat(true) as Array<Threat>);
        return commit_threat_summary(inverse, this.data_filter.get_threat(false) as Array<Threat>);
    }
}
