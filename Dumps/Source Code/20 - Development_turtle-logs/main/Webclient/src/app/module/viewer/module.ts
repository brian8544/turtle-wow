import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {ViewerComponent} from "./component/viewer/viewer";
import {CommonModule} from "@angular/common";
import {ViewerRouting} from "./routing";
import {RaidConfigurationMenuModule} from "./module/raid_configuration_menu/module";
import {RaidTitleBarModule} from "./module/raid_title_bar/module";
import {RaidGraphModule} from "./module/raid_graph/module";
import {RaidMeterModule} from "./module/raid_meter/module";
import {RaidLootModule} from "./module/raid_loot/module";
import {RaidCompositionModule} from "./module/raid_composition/module";
import {RaidDetailTableModule} from "./module/raid_detail_table/module";
import {RaidEventLogModule} from "./module/raid_event_log/module";

@NgModule({
    declarations: [ViewerComponent],
    imports: [
        CommonModule,
        TranslateModule,
        ViewerRouting,
        RaidConfigurationMenuModule,
        RaidTitleBarModule,
        RaidGraphModule,
        RaidMeterModule,
        RaidLootModule,
        RaidCompositionModule,
        RaidDetailTableModule,
        RaidEventLogModule
    ],
    exports: [ViewerComponent]
})
export class ViewerModule {
}
