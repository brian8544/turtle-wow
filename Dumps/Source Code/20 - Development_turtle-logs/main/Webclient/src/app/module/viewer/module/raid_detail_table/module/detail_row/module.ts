import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {DetailRowComponent} from "./component/detail_row/detail_row";
import {CommonModule} from "@angular/common";
import {CaretButtonModule} from "src/app/template/button/caret_button/module";
import {ShowTooltipDirectiveModule} from "../../../../../../directive/show_tooltip/module";

@NgModule({
    declarations: [DetailRowComponent],
    imports: [
        CommonModule,
        TranslateModule,
        CaretButtonModule,
        ShowTooltipDirectiveModule
    ],
    exports: [DetailRowComponent]
})
export class DetailRowModule {
}
