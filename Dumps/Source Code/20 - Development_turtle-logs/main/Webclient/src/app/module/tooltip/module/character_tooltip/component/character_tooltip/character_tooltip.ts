import {Component, Input} from "@angular/core";
import {CharacterTooltip} from "../../domain_value/character_tooltip";

@Component({
    selector: "CharacterTooltip",
    templateUrl: "./character_tooltip.html",
    styleUrls: ["./character_tooltip.scss"]
})
export class CharacterTooltipComponent {

    @Input() payload: CharacterTooltip;

}
