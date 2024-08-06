import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {CommonModule} from "@angular/common";
import {UpdatePasswordComponent} from "./component/update_password/update_password";
import {PasswordInputModule} from "src/app/template/input/password_input/module";
import {ConfirmButtonModule} from "src/app/template/button/confirm_button/module";
import {BriefNoteModule} from "src/app/template/brief_note/module";
import {UpdatePasswordRouting} from "./routing";
import {FormsModule} from "@angular/forms";
import {UpdatePasswordService} from "./service/update_password";
import {FormValidDirectiveModule} from "../../../../directive/form_valid/module";

@NgModule({
    declarations: [UpdatePasswordComponent],
    imports: [
        CommonModule,
        TranslateModule,
        PasswordInputModule,
        ConfirmButtonModule,
        BriefNoteModule,
        UpdatePasswordRouting,
        FormsModule,
        FormValidDirectiveModule
    ],
    exports: [UpdatePasswordComponent],
    providers: [UpdatePasswordService]
})
export class UpdatePasswordModule {
}
