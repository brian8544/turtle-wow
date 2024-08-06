import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {CommonModule} from "@angular/common";
import {ResetPasswordRouting} from "./routing";
import {ResetPasswordComponent} from "./component/reset_password/reset_password";
import {GeneralInputModule} from "../../template/input/general_input/module";
import {ConfirmButtonModule} from "../../template/button/confirm_button/module";
import {FormsModule} from "@angular/forms";
import {ResetPasswordService} from "./service/reset_password";
import {FormValidDirectiveModule} from "../../directive/form_valid/module";

@NgModule({
    declarations: [ResetPasswordComponent],
    imports: [
        CommonModule,
        TranslateModule,
        ResetPasswordRouting,
        GeneralInputModule,
        ConfirmButtonModule,
        FormsModule,
        FormValidDirectiveModule
    ],
    exports: [ResetPasswordComponent],
    providers: [ResetPasswordService]
})
export class ResetPasswordModule {
}
