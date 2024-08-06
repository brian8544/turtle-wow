import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {SpellTooltipComponent} from "./component/spell_tooltip/spell_tooltip";
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [SpellTooltipComponent],
    imports: [
        CommonModule,
        TranslateModule
    ],
    exports: [SpellTooltipComponent]
})
export class SpellTooltipModule {
}
