import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {SpeedRunsComponent} from "./component/speed_runs/speed_runs";
import {CommonModule} from "@angular/common";
import {TableModule} from "../../../../../../template/table/module";
import {RouterModule} from "@angular/router";

@NgModule({
    declarations: [SpeedRunsComponent],
    imports: [
        CommonModule,
        TranslateModule,
        TableModule,
        RouterModule,
    ],
    exports: [SpeedRunsComponent]
})
export class SpeedRunsModule {
}
