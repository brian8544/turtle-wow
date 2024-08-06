import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {RecentRaidsComponent} from "./component/recent_raids/recent_raids";
import {CommonModule} from "@angular/common";
import {TableModule} from "../../../../../../template/table/module";
import {InstanceMapModule} from "../../../../../../template/row_components/instance_map/module";

@NgModule({
    declarations: [RecentRaidsComponent],
    imports: [
        CommonModule,
        TranslateModule,
        TableModule,
        InstanceMapModule
    ],
    exports: [RecentRaidsComponent]
})
export class RecentRaidsModule {
}
