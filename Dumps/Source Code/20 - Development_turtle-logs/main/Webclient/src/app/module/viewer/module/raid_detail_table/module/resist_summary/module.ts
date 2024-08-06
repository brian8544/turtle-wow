import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {ResistSummaryComponent} from "./component/resist_summary/resist_summary";
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [ResistSummaryComponent],
    imports: [
        CommonModule,
        TranslateModule,
    ],
    exports: [ResistSummaryComponent]
})
export class ResistSummaryModule {
}
