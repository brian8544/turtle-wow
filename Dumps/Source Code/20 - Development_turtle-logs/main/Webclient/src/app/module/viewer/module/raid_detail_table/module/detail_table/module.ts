import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {DetailTableComponent} from "./component/detail_table/detail_table";
import {CommonModule} from "@angular/common";
import {DetailRowModule} from "../detail_row/module";

@NgModule({
    declarations: [DetailTableComponent],
    imports: [
        CommonModule,
        TranslateModule,
        DetailRowModule,
    ],
    exports: [DetailTableComponent]
})
export class DetailTableModule {
}
