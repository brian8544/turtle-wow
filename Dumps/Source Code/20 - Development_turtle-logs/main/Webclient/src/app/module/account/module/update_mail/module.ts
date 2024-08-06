import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {CommonModule} from "@angular/common";
import {UpdateMailComponent} from "./component/update_mail/update_mail";
import {PasswordInputModule} from "src/app/template/input/password_input/module";
import {ConfirmButtonModule} from "src/app/template/button/confirm_button/module";
import {GeneralInputModule} from "src/app/template/input/general_input/module";
import {BriefNoteModule} from "src/app/template/brief_note/module";
import {UpdateMailRouting} from "./routing";
import {UpdateMailService} from "./service/update_mail";
import {FormsModule} from "@angular/forms";
import {FormValidDirectiveModule} from "../../../../directive/form_valid/module";

@NgModule({
    declarations: [UpdateMailComponent],
    imports: [
        CommonModule,
        TranslateModule,
        GeneralInputModule,
        PasswordInputModule,
        ConfirmButtonModule,
        BriefNoteModule,
        UpdateMailRouting,
        FormsModule,
        FormValidDirectiveModule
    ],
    exports: [UpdateMailComponent],
    providers: [UpdateMailService]
})
export class UpdateMailModule {
}
