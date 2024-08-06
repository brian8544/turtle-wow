import {NgModule} from "@angular/core";
import {DateInputComponent} from "./component/date_input/date_input";
import {CommonModule} from "@angular/common";
import {GeneralInputModule} from "../general_input/module";

@NgModule({
    declarations: [DateInputComponent],
    imports: [
        CommonModule,
        GeneralInputModule
    ],
    exports: [DateInputComponent]
})
export class DateInputModule {
}
