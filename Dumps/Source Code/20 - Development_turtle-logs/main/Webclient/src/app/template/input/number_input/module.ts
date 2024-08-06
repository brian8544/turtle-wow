import {NgModule} from "@angular/core";
import {NumberInputComponent} from "./component/number_input/number_input";
import {CommonModule} from "@angular/common";
import {GeneralInputModule} from "../general_input/module";

@NgModule({
    declarations: [NumberInputComponent],
    imports: [CommonModule, GeneralInputModule],
    exports: [NumberInputComponent]
})
export class NumberInputModule {
}
