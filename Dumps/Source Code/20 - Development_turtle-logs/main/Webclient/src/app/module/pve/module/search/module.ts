import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {SearchComponent} from "./component/search/search";
import {CommonModule} from "@angular/common";
import {SearchRouting} from "./routing";
import {TableModule} from "../../../../template/table/module";
import {InstanceMapModule} from "../../../../template/row_components/instance_map/module";

@NgModule({
    declarations: [SearchComponent],
    imports: [
        CommonModule,
        TranslateModule,
        SearchRouting,
        TableModule,
        InstanceMapModule
    ],
    exports: [SearchComponent]
})
export class SearchModule {
}
