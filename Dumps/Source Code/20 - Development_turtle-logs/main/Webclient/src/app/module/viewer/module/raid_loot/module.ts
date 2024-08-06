import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {RaidLootComponent} from "./component/raid_loot/raid_loot";
import {CommonModule} from "@angular/common";
import {CaretButtonModule} from "../../../../template/button/caret_button/module";
import {GeneralInputModule} from "../../../../template/input/general_input/module";
import {ItemIconModule} from "../../../../template/item_icon/module";
import {LootItemComponent} from "./component/loot_item/loot_item";

@NgModule({
    declarations: [RaidLootComponent, LootItemComponent],
    imports: [
        CommonModule,
        TranslateModule,
        CaretButtonModule,
        GeneralInputModule,
        ItemIconModule
    ],
    exports: [RaidLootComponent]
})
export class RaidLootModule {
}
