import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {MultiThumbInputComponent} from "./component/multi_thumb_input/multi_thumb_input";
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [MultiThumbInputComponent],
    imports: [
        CommonModule,
        TranslateModule,
    ],
    exports: [MultiThumbInputComponent]
})
export class MultiThumbInputModule {
}
