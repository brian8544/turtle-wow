import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {ContributeComponent} from "./component/contribute/contribute";
import {CommonModule} from "@angular/common";
import {ContributeRouting} from "./routing";

@NgModule({
    declarations: [ContributeComponent],
    imports: [
        CommonModule,
        TranslateModule,
        ContributeRouting
    ],
    exports: [ContributeComponent]
})
export class ContributeModule {
}
