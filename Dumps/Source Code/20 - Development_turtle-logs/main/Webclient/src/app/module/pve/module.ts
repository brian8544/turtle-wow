import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {PveComponent} from "./component/pve/pve";
import {CommonModule} from "@angular/common";
import {PveRouting} from "./routing";

@NgModule({
    declarations: [PveComponent],
    imports: [
        CommonModule,
        TranslateModule,
        PveRouting
    ],
    exports: [PveComponent]
})
export class PveModule {
}
