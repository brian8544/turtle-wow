import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {MeterAbilitiesTooltipComponent} from "./component/meter_abilities_tooltip/meter_abilities_tooltip";
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [MeterAbilitiesTooltipComponent],
    imports: [
        CommonModule,
        TranslateModule
    ],
    exports: [MeterAbilitiesTooltipComponent]
})
export class MeterAbilitiesTooltipModule {
}
