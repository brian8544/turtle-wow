import {InstanceDataFilter} from "../../../tool/instance_data_filter";
import {Unit} from "../../../domain_value/unit";
import {te_death, te_melee_damage, te_spell_damage} from "../../../extractor/targets";
import {se_death} from "../../../extractor/sources";
import {commit_death} from "../stdlib/death";
import {DeathOverviewRow} from "../module/deaths_overview/domain_value/death_overview_row";
import {Death, MeleeDamage, SpellDamage} from "../../../domain_value/event";

export class RaidMeterDeath {

    constructor(
        private data_filter: InstanceDataFilter
    ) {
    }

    async calculate(inverse: boolean): Promise<Array<[number, [Unit, Array<DeathOverviewRow>]]>> {
        if (inverse)
            return commit_death(this.data_filter.get_deaths(true) as Array<Death>,
                this.data_filter.get_melee_damage(false) as Array<MeleeDamage>, this.data_filter.get_spell_damage(false) as Array<SpellDamage>,
                te_melee_damage, te_spell_damage, te_death);
        return commit_death(this.data_filter.get_deaths(false) as Array<Death>,
            this.data_filter.get_melee_damage(true) as Array<MeleeDamage>, this.data_filter.get_spell_damage(true) as Array<SpellDamage>,
            te_melee_damage, te_spell_damage, se_death);
    }
}
