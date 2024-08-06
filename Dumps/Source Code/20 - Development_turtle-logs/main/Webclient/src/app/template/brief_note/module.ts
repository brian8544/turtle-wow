import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {CommonModule} from "@angular/common";
import {BriefNoteComponent} from "./component/brief_note/brief_note";

@NgModule({
    declarations: [BriefNoteComponent],
    imports: [
        CommonModule,
        TranslateModule
    ],
    exports: [BriefNoteComponent]
})
export class BriefNoteModule {
}
