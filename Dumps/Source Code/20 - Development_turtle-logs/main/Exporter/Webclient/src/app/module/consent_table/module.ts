import {NgModule} from "@angular/core";
import {ConsentTableComponent} from "./component/consent_table/consent_table";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {YesNoSwitchModule} from "../../template/button/yes_no_switch/module";
import {HeroClassModule} from "../../template/hero_class/module";

@NgModule({
    declarations: [ConsentTableComponent],
    imports: [
        CommonModule,
        TranslateModule,
        YesNoSwitchModule,
        HeroClassModule
    ],
    exports: [ConsentTableComponent]
})
export class ConsentTableModule {
}
