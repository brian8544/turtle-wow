import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {ArenaComponent} from "./component/arena/arena";
import {CommonModule} from "@angular/common";
import {ArenaRouting} from "./routing";
import {TableModule} from "../../../../template/table/module";
import {InstanceMapModule} from "../../../../template/row_components/instance_map/module";

@NgModule({
    declarations: [ArenaComponent],
    imports: [
        CommonModule,
        TranslateModule,
        ArenaRouting,
        TableModule,
        InstanceMapModule
    ],
    exports: [ArenaComponent]
})
export class ArenaModule {
}
