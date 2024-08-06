import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {ViewerGraphTooltipComponent} from "./component/viewer_graph_tooltip/viewer_graph_tooltip";
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [ViewerGraphTooltipComponent],
    imports: [
        CommonModule,
        TranslateModule,
    ],
    exports: [ViewerGraphTooltipComponent]
})
export class ViewerGraphTooltipModule {
}
