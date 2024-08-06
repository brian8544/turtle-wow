import {NgModule} from "@angular/core";
import {SelectInputComponent} from "./component/select_input/select_input";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    declarations: [SelectInputComponent],
    imports: [CommonModule, TranslateModule],
    exports: [SelectInputComponent]
})
export class SelectInputModule {
}
