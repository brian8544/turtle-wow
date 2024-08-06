import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {CommonModule} from "@angular/common";
import {GeneralInputComponent} from "./component/general_input/general_input";

@NgModule({
    declarations: [GeneralInputComponent],
    imports: [
        CommonModule,
        TranslateModule
    ],
    exports: [GeneralInputComponent]
})
export class GeneralInputModule {
}
