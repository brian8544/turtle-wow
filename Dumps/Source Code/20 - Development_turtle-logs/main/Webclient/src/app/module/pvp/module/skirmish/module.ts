import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {SkirmishComponent} from "./component/skirmish/skirmish";
import {CommonModule} from "@angular/common";
import {SkirmishRouting} from "./routing";
import {TableModule} from "../../../../template/table/module";
import {InstanceMapModule} from "../../../../template/row_components/instance_map/module";

@NgModule({
    declarations: [SkirmishComponent],
    imports: [
        CommonModule,
        TranslateModule,
        SkirmishRouting,
        TableModule,
        InstanceMapModule
    ],
    exports: [SkirmishComponent]
})
export class SkirmishModule {
}
