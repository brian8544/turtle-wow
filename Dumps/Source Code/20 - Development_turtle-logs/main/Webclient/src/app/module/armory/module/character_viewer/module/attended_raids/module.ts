import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {AttendedRaidsComponent} from "./component/attended_raids/attended_raids";
import {CommonModule} from "@angular/common";
import {InstanceMapModule} from "../../../../../../template/row_components/instance_map/module";
import {TableModule} from "../../../../../../template/table/module";

@NgModule({
    declarations: [AttendedRaidsComponent],
    imports: [
        CommonModule,
        TranslateModule,
        InstanceMapModule,
        TableModule
    ],
    exports: [AttendedRaidsComponent]
})
export class AttendedRaidsModule {
}
