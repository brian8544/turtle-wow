import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {RaidEventLogComponent} from "./component/raid_event_log/raid_event_log";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

@NgModule({
    declarations: [RaidEventLogComponent],
    imports: [
        CommonModule,
        TranslateModule,
        RouterModule
    ],
    exports: [RaidEventLogComponent]
})
export class RaidEventLogModule {
}
