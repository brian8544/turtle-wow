import {Component, Input} from "@angular/core";
import {GuildTooltip} from "../../domain_value/guild_tooltip";

@Component({
    selector: "GuildTooltip",
    templateUrl: "./guild_tooltip.html",
    styleUrls: ["./guild_tooltip.scss"]
})
export class GuildTooltipComponent {

    @Input() payload: GuildTooltip;

}
