import {SelectInputModule} from "../../../../../../template/input/select_input/module";
import {IconModule} from "../../../../../../template/icon/module";
import {ItemIconModule} from "../../../../../../template/item_icon/module";
import {CharacterItemsComponent} from "./component/character_items/character_items";
import {CharacterItemComponent} from "./component/character_item/character_item";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

@NgModule({
    declarations: [CharacterItemsComponent, CharacterItemComponent],
    imports: [
        CommonModule,
        TranslateModule,
        IconModule,
        ItemIconModule,
        SelectInputModule,
        RouterModule,
    ],
    exports: [CharacterItemsComponent]
})
export class CharacterItemsModule {
}
