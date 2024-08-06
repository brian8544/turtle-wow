import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {CommonModule} from "@angular/common";
import {ToolsRouting} from "./routing";
import {ToolsComponent} from "./component/tools/tools";

@NgModule({
    declarations: [ToolsComponent],
    imports: [
        CommonModule,
        TranslateModule,
        ToolsRouting
    ],
    exports: [ToolsComponent],
})
export class ToolsModule {
}
