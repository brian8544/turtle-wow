import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {CommonModule} from "@angular/common";
import {TalentSpellTooltipComponent} from "./component/spell_tooltip/talent_spell_tooltip";

@NgModule({
    declarations: [TalentSpellTooltipComponent],
    imports: [
        CommonModule,
        TranslateModule
    ],
    exports: [TalentSpellTooltipComponent]
})
export class TalentSpellTooltipModule {
}
