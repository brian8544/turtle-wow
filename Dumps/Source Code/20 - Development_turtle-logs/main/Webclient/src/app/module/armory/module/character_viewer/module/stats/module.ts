import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {StatsComponent} from "./component/stats/stats";
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [StatsComponent],
    imports: [
        CommonModule,
        TranslateModule
    ],
    exports: [StatsComponent]
})
export class StatsModule {
}
