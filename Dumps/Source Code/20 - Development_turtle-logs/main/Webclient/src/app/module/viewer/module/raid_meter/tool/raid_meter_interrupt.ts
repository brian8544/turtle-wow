import {InstanceDataFilter} from "../../../tool/instance_data_filter";
import {Unit} from "../../../domain_value/unit";
import {UnAuraOverviewRow} from "../module/un_aura_overview/domain_value/un_aura_overview_row";
import {commit_interrupt} from "../stdlib/interrupt";
import {se_interrupt} from "../../../extractor/sources";
import {te_interrupt} from "../../../extractor/targets";
import {Interrupt} from "../../../domain_value/event";

export class RaidMeterInterrupt {

    constructor(
        private data_filter: InstanceDataFilter
    ) {
    }

    async calculate(inverse: boolean): Promise<Array<[number, [Unit, Array<UnAuraOverviewRow>]]>> {
        if (inverse)
            return commit_interrupt(this.data_filter.get_interrupts(false) as Array<Interrupt>, te_interrupt);
        return commit_interrupt(this.data_filter.get_interrupts(false) as Array<Interrupt>, se_interrupt);
    }
}
