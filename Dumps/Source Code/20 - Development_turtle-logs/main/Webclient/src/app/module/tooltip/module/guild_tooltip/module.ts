import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {GuildTooltipComponent} from "./component/guild_tooltip/guild_tooltip";
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [GuildTooltipComponent],
    imports: [
        CommonModule,
        TranslateModule
    ],
    exports: [GuildTooltipComponent]
})
export class GuildTooltipModule {
}
