import {InstanceDataFilter} from "../../../tool/instance_data_filter";
import {Unit} from "../../../domain_value/unit";
import {te_heal} from "../../../extractor/targets";
import {se_heal} from "../../../extractor/sources";
import {commit_heal} from "../stdlib/heal";
import {HealMode} from "../../../domain_value/heal_mode";
import {Heal} from "../../../domain_value/event";

export class RaidMeterHeal {

    constructor(
        private data_filter: InstanceDataFilter
    ) {
    }

    async calculate(heal_mode: HealMode, inverse: boolean): Promise<Array<[number, [Unit, Array<[number, number]>]]>> {
        if (inverse)
            return commit_heal(heal_mode, this.data_filter.get_heal(true) as Array<Heal>, te_heal);
        return commit_heal(heal_mode, this.data_filter.get_heal(false) as Array<Heal>, se_heal);
    }
}
