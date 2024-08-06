import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {GuildRosterComponent} from "./component/guild_roster/guild_roster";
import {CommonModule} from "@angular/common";
import {TableModule} from "../../../../../../template/table/module";
import {HeroClassModule} from "../../../../../../template/row_components/hero_class/module";
import {ShowTooltipDirectiveModule} from "../../../../../../directive/show_tooltip/module";
import {RouterModule} from "@angular/router";

@NgModule({
    declarations: [GuildRosterComponent],
    imports: [
        CommonModule,
        TranslateModule,
        TableModule,
        HeroClassModule,
        ShowTooltipDirectiveModule,
        RouterModule
    ],
    exports: [GuildRosterComponent]
})
export class GuildRosterModule {
}
