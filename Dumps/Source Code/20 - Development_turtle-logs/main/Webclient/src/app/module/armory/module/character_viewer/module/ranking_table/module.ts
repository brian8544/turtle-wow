import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {RankingTableComponent} from "./component/ranking_table/ranking_table";
import {CommonModule} from "@angular/common";
import {TableModule} from "../../../../../../template/table/module";

@NgModule({
    declarations: [RankingTableComponent],
    imports: [
        CommonModule,
        TranslateModule,
        TableModule
    ],
    exports: [RankingTableComponent]
})
export class RankingTableModule {
}
