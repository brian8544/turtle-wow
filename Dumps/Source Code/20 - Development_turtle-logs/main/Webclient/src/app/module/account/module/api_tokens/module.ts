import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {CommonModule} from "@angular/common";
import {ConfirmButtonModule} from "src/app/template/button/confirm_button/module";
import {GeneralInputModule} from "src/app/template/input/general_input/module";
import {APITokensComponent} from "./component/api_tokens/api_tokens";
import {APITokensRouting} from "./routing";
import {APITokensService} from "./service/api_tokens";
import {FormsModule} from "@angular/forms";
import {DateInputModule} from "../../../../template/input/date_input/module";
import {FormValidDirectiveModule} from "../../../../directive/form_valid/module";
import {BriefNoteModule} from "../../../../template/brief_note/module";

@NgModule({
    declarations: [APITokensComponent],
    imports: [
        CommonModule,
        TranslateModule,
        GeneralInputModule,
        DateInputModule,
        ConfirmButtonModule,
        APITokensRouting,
        FormsModule,
        FormValidDirectiveModule,
        BriefNoteModule
    ],
    exports: [APITokensComponent],
    providers: [APITokensService]
})
export class APITokensModule {
}
