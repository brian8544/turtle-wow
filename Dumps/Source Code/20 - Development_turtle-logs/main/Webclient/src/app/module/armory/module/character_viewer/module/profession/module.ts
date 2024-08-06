import {NgModule} from "@angular/core";
import {ProfessionComponent} from "./component/profession/profession";
import {CommonModule} from "@angular/common";
import {IconModule} from "../../../../../../template/icon/module";

@NgModule({
    declarations: [ProfessionComponent],
    imports: [CommonModule, IconModule],
    exports: [ProfessionComponent]
})
export class ProfessionModule {
}
