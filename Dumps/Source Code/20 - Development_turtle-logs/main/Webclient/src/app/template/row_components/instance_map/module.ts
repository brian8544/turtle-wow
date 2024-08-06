import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {InstanceMapComponent} from "./component/instance_map/instance_map";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

@NgModule({
    declarations: [InstanceMapComponent],
    imports: [
        CommonModule,
        TranslateModule,
        RouterModule
    ],
    exports: [InstanceMapComponent]
})
export class InstanceMapModule {
}
