import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {SpeedRunComponent} from "./component/speed_run/speed_run";
import {CommonModule} from "@angular/common";
import {SpeedRunRouting} from "./routing";
import {MeterGraphModule} from "../../../../template/meter_graph/module";
import {SelectInputModule} from "../../../../template/input/select_input/module";
import {MultiSelectModule} from "../../../../template/input/multi_select/module";

@NgModule({
    declarations: [SpeedRunComponent],
    imports: [
        CommonModule,
        TranslateModule,
        SpeedRunRouting,
        MeterGraphModule,
        SelectInputModule,
        MultiSelectModule
    ],
    exports: [SpeedRunComponent]
})
export class SpeedRunModule {
}
