import {NgModule} from "@angular/core";
import {TableComponent} from "./component/table/table";
import {CommonModule} from "@angular/common";
import {TableHeaderModule} from "./module/table_header/module";
import {TableBodyModule} from "./module/table_body/module";
import {TableFooterModule} from "./module/table_footer/module";
import {MinimizerModule} from "../button/minimizer/module";

@NgModule({
    declarations: [TableComponent],
    imports: [CommonModule, TableHeaderModule, TableBodyModule, TableFooterModule, MinimizerModule],
    exports: [TableComponent]
})
export class TableModule {
}
