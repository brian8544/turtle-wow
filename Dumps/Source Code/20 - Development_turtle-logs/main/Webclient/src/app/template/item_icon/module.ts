import {NgModule} from "@angular/core";
import {ItemIconComponent} from "./component/item_icon/item_icon";
import {CommonModule} from "@angular/common";
import {IconModule} from "../icon/module";
import {ShowTooltipDirectiveModule} from "../../directive/show_tooltip/module";

@NgModule({
    declarations: [ItemIconComponent],
    imports: [CommonModule, IconModule, ShowTooltipDirectiveModule],
    exports: [ItemIconComponent]
})
export class ItemIconModule {
}
