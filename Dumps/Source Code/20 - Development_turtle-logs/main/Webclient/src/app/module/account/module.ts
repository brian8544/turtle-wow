import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {AccountComponent} from "./component/account/account";
import {NavigationBarComponent} from "./component/navigation_bar/navigation_bar";
import {AccountRouting} from "./routing";
import {CommonModule} from "@angular/common";
import {CaretButtonModule} from "../../template/button/caret_button/module";
import {AccountService} from "./service/account";

@NgModule({
    declarations: [
        AccountComponent,
        NavigationBarComponent
    ],
    imports: [
        CommonModule,
        TranslateModule,
        AccountRouting,
        CaretButtonModule
    ],
    exports: [AccountComponent],
    providers: [AccountService]
})
export class AccountModule {
}
