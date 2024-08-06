import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {MultiSelectComponent} from "./component/multi_select/multi_select";
import {CommonModule} from "@angular/common";
import {NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";
import {FormsModule} from "@angular/forms";

@NgModule({
    declarations: [MultiSelectComponent],
    imports: [
        CommonModule,
        TranslateModule,
        NgMultiSelectDropDownModule,
        FormsModule
    ],
    exports: [MultiSelectComponent]
})
export class MultiSelectModule {
}
