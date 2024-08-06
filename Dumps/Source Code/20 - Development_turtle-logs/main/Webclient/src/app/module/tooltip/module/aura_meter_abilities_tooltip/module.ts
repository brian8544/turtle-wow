import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {AuraMeterAbilitiesTooltipComponent} from "./component/meter_abilities_tooltip/aura_meter_abilities_tooltip";
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [AuraMeterAbilitiesTooltipComponent],
    imports: [
        CommonModule,
        TranslateModule
    ],
    exports: [AuraMeterAbilitiesTooltipComponent]
})
export class AuraMeterAbilitiesTooltipModule {
}
