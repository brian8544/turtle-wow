import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {CommonModule} from "@angular/common";
import {PasswordInputComponent} from "./component/password_input/password_input";
import {GeneralInputModule} from "../general_input/module";

@NgModule({
    declarations: [PasswordInputComponent],
    imports: [
        CommonModule,
        TranslateModule,
        GeneralInputModule
    ],
    exports: [PasswordInputComponent]
})
export class PasswordInputModule {
}
