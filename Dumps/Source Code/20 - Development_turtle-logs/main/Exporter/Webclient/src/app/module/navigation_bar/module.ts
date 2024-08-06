import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {NavigationBarComponent} from "./component/navigation_bar/navigation_bar";
import {ItemListComponent} from "./component/item_list/item_list";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {CaretButtonModule} from "../../template/button/caret_button/module";

@NgModule({
    declarations: [
        NavigationBarComponent,
        ItemListComponent
    ],
    imports: [
        CommonModule,
        TranslateModule,
        RouterModule,
        CaretButtonModule
    ],
    exports: [NavigationBarComponent]
})
export class NavigationBarModule {
}
