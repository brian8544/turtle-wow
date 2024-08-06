import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {ViewerAuraGainTooltipComponent} from "./component/viewer_aura_gain_tooltip/viewer_aura_gain_tooltip";
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [ViewerAuraGainTooltipComponent],
    imports: [
        CommonModule,
        TranslateModule
    ],
    exports: [ViewerAuraGainTooltipComponent]
})
export class ViewerAuraGainTooltipModule {
}
