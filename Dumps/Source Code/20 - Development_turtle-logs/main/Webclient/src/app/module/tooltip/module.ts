import {NgModule} from "@angular/core";
import {TooltipComponent} from "./component/tooltip/tooltip";
import {CommonModule} from "@angular/common";
import {CharacterTooltipModule} from "./module/character_tooltip/module";
import {TooltipService} from "./service/tooltip";
import {TranslateModule} from "@ngx-translate/core";
import {ItemTooltipModule} from "./module/item_tooltip/module";
import {GuildTooltipModule} from "./module/guild_tooltip/module";
import {MeterAbilitiesTooltipModule} from "./module/meter_abilities_tooltip/module";
import {DeathsOverviewModule} from "../viewer/module/raid_meter/module/deaths_overview/module";
import {ViewerEventLogTooltipModule} from "./module/viewer_event_log_tooltip/module";
import {UnAuraOverviewModule} from "../viewer/module/raid_meter/module/un_aura_overview/module";
import {ViewerGraphTooltipModule} from "./module/viewer_graph_tooltip/module";
import {ResistSummaryModule} from "../viewer/module/raid_detail_table/module/resist_summary/module";
import {DetailTableModule} from "../viewer/module/raid_detail_table/module/detail_table/module";
import {SpellTooltipModule} from "./module/spell_tooltip/module";
import {ViewerAuraGainTooltipModule} from "./module/viewer_aura_gain_tooltip/module";
import {TalentSpellTooltipModule} from "./module/talent_spell_tooltip/module";
import {AuraMeterAbilitiesTooltipModule} from "./module/aura_meter_abilities_tooltip/module";
import {RankingMeterTooltipModule} from "./module/ranking_meter_tooltip/module";

@NgModule({
    declarations: [TooltipComponent],
    imports: [
        CommonModule,
        CharacterTooltipModule,
        ItemTooltipModule,
        GuildTooltipModule,
        MeterAbilitiesTooltipModule,
        TranslateModule,
        DeathsOverviewModule,
        ViewerEventLogTooltipModule,
        UnAuraOverviewModule,
        ViewerGraphTooltipModule,
        ResistSummaryModule,
        DetailTableModule,
        SpellTooltipModule,
        ViewerAuraGainTooltipModule,
        TalentSpellTooltipModule,
        AuraMeterAbilitiesTooltipModule,
        RankingMeterTooltipModule
    ],
    exports: [TooltipComponent],
    providers: [TooltipService]
})
export class TooltipModule {
}
