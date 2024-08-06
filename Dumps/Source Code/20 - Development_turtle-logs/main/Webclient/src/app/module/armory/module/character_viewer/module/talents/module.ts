import {NgModule} from "@angular/core";
import {TalentsComponent} from "./component/talents/talents";
import {CommonModule} from "@angular/common";
import {IconModule} from "../../../../../../template/icon/module";
import {RouterModule} from "@angular/router";

@NgModule({
    declarations: [TalentsComponent],
    imports: [CommonModule, IconModule, RouterModule],
    exports: [TalentsComponent]
})
export class TalentsModule {
}
