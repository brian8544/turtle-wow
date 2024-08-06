import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {CommonModule} from "@angular/common";
import {UpdateNicknameComponent} from "./component/update_nickname/update_nickname";
import {GeneralInputModule} from "src/app/template/input/general_input/module";
import {ConfirmButtonModule} from "src/app/template/button/confirm_button/module";
import {UpdateNicknameRouting} from "./routing";
import {FormsModule} from "@angular/forms";
import {FormValidDirectiveModule} from "../../../../directive/form_valid/module";

@NgModule({
    declarations: [UpdateNicknameComponent],
    imports: [
        CommonModule,
        TranslateModule,
        GeneralInputModule,
        ConfirmButtonModule,
        UpdateNicknameRouting,
        FormsModule,
        FormValidDirectiveModule
    ],
    exports: [UpdateNicknameComponent],
    bootstrap: [UpdateNicknameComponent]
})
export class UpdateNicknameModule {
}
