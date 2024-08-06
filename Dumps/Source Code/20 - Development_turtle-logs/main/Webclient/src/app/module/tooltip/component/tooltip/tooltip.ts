import {Component} from "@angular/core";
import {TooltipControllerService} from "../../../../service/tooltip_controller";
import {TooltipService} from "../../service/tooltip";

@Component({
    selector: "Tooltip",
    templateUrl: "./tooltip.html",
    styleUrls: ["./tooltip.scss"]
})
export class TooltipComponent {

    iconPath: string;
    tooltipType: number;
    tooltipPayload: any;
    tooltipArgs: any;

    constructor(
        private tooltipControllerService: TooltipControllerService,
        private tooltipService: TooltipService
    ) {
        this.tooltipControllerService.subscribe(args => {
            this.tooltipType = undefined;
            this.tooltipPayload = undefined;
            this.iconPath = undefined;
            this.tooltipArgs = args;

            if (args.type === 1) {
                this.tooltipService.loadCharacterTooltip(args.character_id, result => {
                    this.tooltipType = args.type;
                    this.tooltipPayload = result;
                    this.iconPath = "/assets/wow_hero_classes/c" + result.hero_class_id + ".png";
                }, args.timestamp);
            } else if (args.type === 2) {
                this.tooltipService.loadCharacterItemTooltip(args.history_id, args.item_id, result => {
                    this.tooltipType = args.type;
                    this.tooltipPayload = result;
                    this.iconPath = "/assets/wow_icon/" + result.icon + ".jpg";
                });
            } else if (args.type === 3) {
                this.tooltipService.loadGuildTooltip(args.guild_id, result => {
                    this.tooltipType = args.type;
                    this.tooltipPayload = result;
                });
            } else if (args.type === 4) {
                this.tooltipService.loadItemTooltip(args.expansion_id, args.item_id, result => {
                    this.tooltipType = args.type;
                    this.tooltipPayload = result;
                    this.iconPath = "/assets/wow_icon/" + result.icon + ".jpg";
                });
            } else if (args.type === 5) {
                this.tooltipType = args.type;
                this.tooltipPayload = args.payload;
                this.tooltipArgs = args;
            } else if (args.type === 6) {
                this.tooltipType = args.type;
                this.tooltipPayload = args.payload;
                this.iconPath = args.icon.content;
            } else if (args.type === 7) {
                this.tooltipType = args.type;
                this.tooltipPayload = args.payload;
                this.iconPath = "/assets/wow_icon/inv_misc_bone_skull_02.jpg";
            } else if (args.type === 8) {
                this.tooltipType = args.type;
                this.tooltipPayload = args.payload;
                this.iconPath = "/assets/wow_icon/inv_misc_book_08.jpg";
            } else if (args.type === 9) {
                this.tooltipType = args.type;
                this.tooltipPayload = args.payload;
                this.iconPath = "/assets/wow_icon/spell_holy_dispelmagic.jpg";
            } else if (args.type === 10) {
                this.tooltipType = args.type;
                this.tooltipPayload = args.payload;
            } else if (args.type === 11) {
                this.tooltipType = args.type;
                this.tooltipPayload = args.payload;
            } else if (args.type === 12) {
                this.tooltipType = args.type;
                this.tooltipPayload = args.payload;
                this.iconPath = "/assets/wow_icon/ability_kick.jpg";
            } else if (args.type === 13) {
                this.tooltipType = args.type;
                this.tooltipPayload = args.payload;
                this.iconPath = "/assets/wow_icon/spell_arcane_arcane02.jpg";
            } else if (args.type === 14) {
                this.tooltipService.loadSpellTooltip(args.expansion_id, args.spell_id, result => {
                    this.tooltipType = args.type;
                    this.tooltipPayload = result;
                    this.tooltipPayload.spell_id = args.spell_id;
                    this.iconPath = "/assets/wow_icon/" + result.icon + ".jpg";
                });
            } else if (args.type === 15) {
                this.tooltipType = args.type;
                this.tooltipPayload = args.payload;
                this.iconPath = args.icon.content;
            } else if (args.type === 16) {
                this.tooltipService.loadSpellTooltip(args.expansion_id, args.spell_ids[args.index === args.spell_ids.length ? args.spell_ids.length - 1 : (args.index === 0 ? 0 : args.index - 1)], result => {
                    if (args.index < args.spell_ids.length && args.index != 0) {
                        this.tooltipService.loadSpellTooltip(args.expansion_id, args.spell_ids[args.index], result2 => {
                            this.tooltipType = args.type;
                            this.iconPath = "/assets/wow_icon/" + result.icon + ".jpg";
                            this.tooltipPayload = {"r1": result, "r2": result2};
                            this.tooltipPayload.spell_ids = args.spell_ids;
                            this.tooltipPayload.points_spend = args.index;
                        });
                    } else {
                        this.tooltipType = args.type;
                        this.iconPath = "/assets/wow_icon/" + result.icon + ".jpg";
                        this.tooltipPayload = {"r1": result, "r2": undefined};
                        this.tooltipPayload.spell_ids = args.spell_ids;
                        this.tooltipPayload.points_spend = args.index;
                    }
                });
            } else {
                this.tooltipType = args.type;
                this.tooltipPayload = args.payload;
            }
        });
    }

}
