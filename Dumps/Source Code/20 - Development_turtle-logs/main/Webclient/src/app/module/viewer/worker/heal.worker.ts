import { expose } from 'comlink';
import {Rechenknecht} from "../tool/rechenknecht";
import {InstanceDataFilter} from "../tool/instance_data_filter";
import {RaidMeterKnecht} from "../module/raid_meter/tool/raid_meter_knecht";
import {RaidGraphKnecht} from "../module/raid_graph/tool/raid_graph_knecht";
import {RaidDetailKnecht} from "../module/raid_detail_table/tool/raid_detail_knecht";
import {RaidEventLogKnecht} from "../module/raid_event_log/tool/raid_event_log_knecht";

addEventListener('message', ({ data }) => {
    if (!!data && !!data[1] && data[0] === "INIT") {
        const filter = new InstanceDataFilter(data[1], data[2], [14, 1]);
        const raid_meter_knecht = new RaidMeterKnecht(filter);
        const raid_graph_knecht = new RaidGraphKnecht(filter);
        const raid_detail_knecht = new RaidDetailKnecht(filter);
        const raid_event_log_knecht = new RaidEventLogKnecht(filter);
        const knecht = new Rechenknecht(filter, raid_meter_knecht, raid_graph_knecht, raid_detail_knecht, raid_event_log_knecht);
        expose(knecht);
    }
});
