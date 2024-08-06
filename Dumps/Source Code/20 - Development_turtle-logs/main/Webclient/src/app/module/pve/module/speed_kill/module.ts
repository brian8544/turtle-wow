import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {SpeedKillComponent} from "./component/speed_kill/speed_kill";
import {CommonModule} from "@angular/common";
import {SpeedKillRouting} from "./routing";
import {MeterGraphModule} from "../../../../template/meter_graph/module";
import {MultiSelectModule} from "../../../../template/input/multi_select/module";
import {SelectInputModule} from "../../../../template/input/select_input/module";

@NgModule({
    declarations: [SpeedKillComponent],
    imports: [
        CommonModule,
        TranslateModule,
        SpeedKillRouting,
        MeterGraphModule,
        MultiSelectModule,
        SelectInputModule
    ],
    exports: [SpeedKillComponent]
})
export class SpeedKillModule {
}
