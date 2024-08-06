import {InstanceDataFilter} from "../../../tool/instance_data_filter";
import {RaidDetailDamage} from "./raid_detail_damage";
import {RaidDetailHeal} from "./raid_detail_heal";
import {RaidDetailThreat} from "./raid_detail_threat";

export class RaidDetailKnecht {

    public damage: RaidDetailDamage;
    public heal: RaidDetailHeal;
    public threat: RaidDetailThreat;

    constructor(
        private data_filter: InstanceDataFilter
    ) {
        this.damage = new RaidDetailDamage(data_filter);
        this.heal = new RaidDetailHeal(data_filter);
        this.threat = new RaidDetailThreat(data_filter);
    }
}
