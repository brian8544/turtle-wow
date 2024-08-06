import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {TalentTabComponent} from "./component/talent_tab/talent_tab";
import {CommonModule} from "@angular/common";
import {TalentIconComponent} from "./component/talent_icon/talent_icon";
import {TalentArrowComponent} from "./component/talent_arrow/talent_arrow";
import {ShowTooltipDirectiveModule} from "../../../../../../directive/show_tooltip/module";

@NgModule({
    declarations: [TalentTabComponent, TalentIconComponent, TalentArrowComponent],
    imports: [
        CommonModule,
        TranslateModule,
        ShowTooltipDirectiveModule
    ],
    exports: [TalentTabComponent]
})
export class TalentTabModule {
}
