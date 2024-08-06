import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {PvpComponent} from "./component/pvp/pvp";
import {CommonModule} from "@angular/common";
import {PvpRouting} from "./routing";

@NgModule({
    declarations: [PvpComponent],
    imports: [
        CommonModule,
        TranslateModule,
        PvpRouting
    ],
    exports: [PvpComponent]
})
export class PvpModule {
}
