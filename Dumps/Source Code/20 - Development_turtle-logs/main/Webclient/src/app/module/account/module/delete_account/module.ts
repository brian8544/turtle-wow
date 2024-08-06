import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {CommonModule} from "@angular/common";
import {DeleteAccountComponent} from "./component/delete_account/delete_account";
import {PasswordInputModule} from "src/app/template/input/password_input/module";
import {ConfirmButtonModule} from "src/app/template/button/confirm_button/module";
import {BriefNoteModule} from "src/app/template/brief_note/module";
import {DeleteAccountRouting} from "./routing";
import {DeleteAccountService} from "./service/delete_account";

@NgModule({
    declarations: [DeleteAccountComponent],
    imports: [
        CommonModule,
        TranslateModule,
        PasswordInputModule,
        ConfirmButtonModule,
        BriefNoteModule,
        DeleteAccountRouting
    ],
    exports: [DeleteAccountComponent],
    providers: [DeleteAccountService]
})
export class DeleteAccountModule {
}
