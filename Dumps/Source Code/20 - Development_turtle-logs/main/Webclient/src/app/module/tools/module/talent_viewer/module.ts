import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {TalentViewerComponent} from "./component/talent_viewer/talent_viewer";
import {CommonModule} from "@angular/common";
import {TalentViewerRouting} from "./routing";
import {TalentTabModule} from "./module/talent_tab/module";
import {SelectInputModule} from "../../../../template/input/select_input/module";

@NgModule({
    declarations: [TalentViewerComponent],
    imports: [
        CommonModule,
        TranslateModule,
        TalentViewerRouting,
        TalentTabModule,
        SelectInputModule,
    ],
    exports: [TalentViewerComponent]
})
export class TalentViewerModule {
}
