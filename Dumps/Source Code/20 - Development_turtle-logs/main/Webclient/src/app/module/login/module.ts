import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {CommonModule} from "@angular/common";
import {LoginRouting} from "./routing";
import {LoginComponent} from "./component/login/login";
import {GeneralInputModule} from "../../template/input/general_input/module";
import {PasswordInputModule} from "../../template/input/password_input/module";
import {ConfirmButtonModule} from "../../template/button/confirm_button/module";
import {LoginService} from "./service/login";
import {FormsModule} from "@angular/forms";
import {FormValidDirectiveModule} from "../../directive/form_valid/module";

@NgModule({
    declarations: [LoginComponent],
    imports: [
        CommonModule,
        TranslateModule,
        LoginRouting,
        GeneralInputModule,
        PasswordInputModule,
        ConfirmButtonModule,
        FormsModule,
        FormValidDirectiveModule
    ],
    exports: [LoginComponent],
    providers: [LoginService]
})
export class LoginModule {
}
