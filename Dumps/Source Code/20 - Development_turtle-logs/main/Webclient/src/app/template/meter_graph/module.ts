import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {MeterGraphComponent} from "./component/meter_graph/meter_graph";
import {CommonModule} from "@angular/common";
import {ShowTooltipDirectiveModule} from "../../directive/show_tooltip/module";

@NgModule({
    declarations: [MeterGraphComponent],
    imports: [
        CommonModule,
        TranslateModule,
        ShowTooltipDirectiveModule
    ],
    exports: [MeterGraphComponent]
})
export class MeterGraphModule {
}
