import {NgModule} from "@angular/core";
import {YesNoSwitchComponent} from "./component/yes_no_switch/yes_no_switch";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

@NgModule({
    declarations: [YesNoSwitchComponent],
    imports: [CommonModule, FormsModule],
    exports: [YesNoSwitchComponent]
})
export class YesNoSwitchModule {
}
