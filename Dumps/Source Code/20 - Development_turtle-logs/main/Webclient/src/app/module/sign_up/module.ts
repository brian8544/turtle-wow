import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {CommonModule} from "@angular/common";
import {SignUpRouting} from "./routing";
import {SignUpComponent} from "./component/sign_up/sign_up";
import {GeneralInputModule} from "../../template/input/general_input/module";
import {PasswordInputModule} from "../../template/input/password_input/module";
import {ConfirmButtonModule} from "../../template/button/confirm_button/module";
import {FormsModule} from "@angular/forms";
import {FormValidDirectiveModule} from "../../directive/form_valid/module";

@NgModule({
    declarations: [SignUpComponent],
    imports: [
        CommonModule,
        TranslateModule,
        SignUpRouting,
        GeneralInputModule,
        PasswordInputModule,
        ConfirmButtonModule,
        FormsModule,
        FormValidDirectiveModule
    ],
    exports: [SignUpComponent]
})
export class SignUpModule {
}
