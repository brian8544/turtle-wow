import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {RaidConfigurationMenuComponent} from "./component/raid_configuration_menu/raid_configuration_menu";
import {CommonModule} from "@angular/common";
import {MultiSelectModule} from "../../../../template/input/multi_select/module";
import {GeneralInputModule} from "../../../../template/input/general_input/module";
import {ClickOutsideDirectiveModule} from "../../../../directive/click_outside/module";
import {RouterModule} from "@angular/router";
import {ExportViewerModule} from "./module/export_viewer/module";
import {MultiThumbInputModule} from "../../../../template/input/multi_thumb_input/module";
import {ShowTooltipDirectiveModule} from "../../../../directive/show_tooltip/module";
import {RaidBrowserModule} from "./module/raid_browser/module";

@NgModule({
    declarations: [RaidConfigurationMenuComponent],
    imports: [
        CommonModule,
        TranslateModule,
        MultiSelectModule,
        GeneralInputModule,
        ClickOutsideDirectiveModule,
        RouterModule,
        ExportViewerModule,
        MultiThumbInputModule,
        ShowTooltipDirectiveModule,
        RaidBrowserModule
    ],
    exports: [RaidConfigurationMenuComponent]
})
export class RaidConfigurationMenuModule {
}
