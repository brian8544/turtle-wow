import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {AddonPastebinComponent} from "./component/addon_pastebin/addon_pastebin";
import {CommonModule} from "@angular/common";
import {AddonPastebinRouting} from "./routing";

@NgModule({
    declarations: [AddonPastebinComponent],
    imports: [
        CommonModule,
        TranslateModule,
        AddonPastebinRouting,
    ],
    exports: [AddonPastebinComponent]
})
export class AddonPastebinModule {
}
