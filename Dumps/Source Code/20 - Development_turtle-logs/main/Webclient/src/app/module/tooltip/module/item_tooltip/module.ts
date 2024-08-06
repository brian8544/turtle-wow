import {NgModule} from "@angular/core";
import {ItemTooltipComponent} from "./component/item_tooltip/item_tooltip";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {IconModule} from "../../../../template/icon/module";

@NgModule({
    declarations: [ItemTooltipComponent],
    imports: [CommonModule, TranslateModule, IconModule],
    exports: [ItemTooltipComponent]
})
export class ItemTooltipModule {
}
