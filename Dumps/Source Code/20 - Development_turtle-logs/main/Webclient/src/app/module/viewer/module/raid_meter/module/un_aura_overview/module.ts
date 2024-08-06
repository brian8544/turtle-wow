import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {UnAuraOverviewComponent} from "./component/un_aura_overview/un_aura_overview";
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [UnAuraOverviewComponent],
    imports: [
        CommonModule,
        TranslateModule
    ],
    exports: [UnAuraOverviewComponent]
})
export class UnAuraOverviewModule {
}
