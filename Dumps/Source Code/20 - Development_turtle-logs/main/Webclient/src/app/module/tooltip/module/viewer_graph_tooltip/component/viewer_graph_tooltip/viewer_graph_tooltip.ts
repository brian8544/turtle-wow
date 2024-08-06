import {Component, Input} from "@angular/core";
import {DataSet} from "../../../../../viewer/module/raid_graph/domain_value/data_set";

@Component({
    selector: "ViewerGraphTooltip",
    templateUrl: "./viewer_graph_tooltip.html",
    styleUrls: ["./viewer_graph_tooltip.scss"]
})
export class ViewerGraphTooltipComponent {

    @Input() payload: Array<[DataSet, string]>;

}
