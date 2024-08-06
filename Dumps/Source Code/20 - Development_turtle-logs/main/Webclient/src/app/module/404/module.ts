import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {FourOFourComponent} from "./component/404/404";
import {CommonModule} from "@angular/common";
import {FourOFourRouting} from "./routing";

@NgModule({
    declarations: [FourOFourComponent],
    imports: [
        CommonModule,
        TranslateModule,
        FourOFourRouting
    ],
    exports: [FourOFourComponent]
})
export class FourOFourModule {
}
