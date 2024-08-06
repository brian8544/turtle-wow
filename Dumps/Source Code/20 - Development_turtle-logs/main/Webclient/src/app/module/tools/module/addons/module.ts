import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {AddonsComponent} from "./component/addons/addons";
import {CommonModule} from "@angular/common";
import {AddonsRouting} from "./routing";
import {TableModule} from "../../../../template/table/module";

@NgModule({
    declarations: [AddonsComponent],
    imports: [
        CommonModule,
        TranslateModule,
        AddonsRouting,
        TableModule
    ],
    exports: [AddonsComponent]
})
export class AddonsModule {
}
