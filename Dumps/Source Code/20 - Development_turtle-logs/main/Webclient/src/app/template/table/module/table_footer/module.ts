import {NgModule} from "@angular/core";
import {TableFooterComponent} from "./component/table_footer/table_footer";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {FooterPagerComponent} from "./component/footer_pager/footer_pager";

@NgModule({
    declarations: [TableFooterComponent, FooterPagerComponent],
    imports: [CommonModule, TranslateModule],
    exports: [TableFooterComponent]
})
export class TableFooterModule {
}
