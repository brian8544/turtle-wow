import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {SpeedKillsComponent} from "./component/speed_kills/speed_kills";
import {CommonModule} from "@angular/common";
import {TableModule} from "../../../../../../template/table/module";
import {RouterModule} from "@angular/router";

@NgModule({
    declarations: [SpeedKillsComponent],
    imports: [
        CommonModule,
        TranslateModule,
        TableModule,
        RouterModule,
    ],
    exports: [SpeedKillsComponent]
})
export class SpeedKillsModule {
}
