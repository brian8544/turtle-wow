import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {SearchComponent} from "./component/search/search";
import {CommonModule} from "@angular/common";
import {TableModule} from "../../../../../../template/table/module";
import {SearchRouting} from "./routing";

@NgModule({
    declarations: [SearchComponent],
    imports: [
        CommonModule,
        TranslateModule,
        TableModule,
        SearchRouting
    ],
    exports: [SearchComponent]
})
export class SearchModule {
}
