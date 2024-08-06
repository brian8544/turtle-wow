import {Component, Input} from "@angular/core";
import {SpellTooltip} from "../../../spell_tooltip/domain_value/spell_tooltip";

@Component({
    selector: "TalentSpellTooltip",
    templateUrl: "./talent_spell_tooltip.html",
    styleUrls: ["./talent_spell_tooltip.scss"]
})
export class TalentSpellTooltipComponent {

    @Input() payload: {r1: SpellTooltip, r2: SpellTooltip, spell_ids: Array<number>, points_spend: number };

}
