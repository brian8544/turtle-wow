import {InstanceDataFilter} from "../../../tool/instance_data_filter";
import {Unit} from "../../../domain_value/unit";
import {te_threat} from "../../../extractor/targets";
import {se_threat} from "../../../extractor/sources";
import {commit_threat} from "../stdlib/threat";
import {Threat} from "../../../domain_value/event";

export class RaidMeterThreat {

    constructor(
        private data_filter: InstanceDataFilter
    ) {
    }

    async calculate(inverse: boolean): Promise<Array<[number, [Unit, Array<[number, number]>]]>> {
        if (inverse)
            return commit_threat(this.data_filter.get_threat(true) as Array<Threat>, te_threat);
        return commit_threat(this.data_filter.get_threat(false) as Array<Threat>, se_threat);
    }
}
