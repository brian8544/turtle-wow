import {NgModule} from "@angular/core";
import {TableBodyComponent} from "./component/table_body/table_body";
import {CommonModule} from "@angular/common";
import {BodyTdComponent} from "./component/body_td/body_td";
import {TranslateModule} from "@ngx-translate/core";
import {CaretButtonModule} from "../../../button/caret_button/module";
import {BodyRowComponent} from "./component/body_row/body_row";
import {ResponsiveBodyRowComponent} from "./component/responsive_body_row/responsive_body_row";
import {RouterModule} from "@angular/router";

@NgModule({
    declarations: [TableBodyComponent, BodyTdComponent, BodyRowComponent, ResponsiveBodyRowComponent],
    imports: [CommonModule, TranslateModule, CaretButtonModule, RouterModule],
    exports: [TableBodyComponent]
})
export class TableBodyModule {
}
