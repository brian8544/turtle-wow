import {Component, Input} from "@angular/core";
import {SpellTooltip} from "../../domain_value/spell_tooltip";

@Component({
    selector: "SpellTooltip",
    templateUrl: "./spell_tooltip.html",
    styleUrls: ["./spell_tooltip.scss"]
})
export class SpellTooltipComponent {

    @Input() spell_tooltip: SpellTooltip;

}
