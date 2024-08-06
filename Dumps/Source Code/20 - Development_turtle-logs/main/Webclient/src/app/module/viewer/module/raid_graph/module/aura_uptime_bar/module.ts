import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {AuraUptimeBarComponent} from "./component/aura_uptime_bar/aura_uptime_bar";
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [AuraUptimeBarComponent],
    imports: [
        CommonModule,
        TranslateModule
    ],
    exports: [AuraUptimeBarComponent]
})
export class AuraUptimeBarModule {
}
