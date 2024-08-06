import {Injectable} from "@angular/core";
import {APIService} from "../../../service/api";

@Injectable({
    providedIn: "root",
})
export class TooltipService {
    private static readonly URL_TOOLTIP: string = "/tooltip";
    private static readonly URL_ITEM_TOOLTIP: string = "/item/:expansion_id/:item_id";
    private static readonly URL_CHARACTER_ITEM_TOOLTIP: string = "/item/armory";
    private static readonly URL_SPELL_TOOLTIP: string = "/spell/:expansion_id/:spell_id";
    private static readonly URL_CHARACTER_TOOLTIP: string = "/character";
    private static readonly URL_GUILD_TOOLTIP: string = "/guild";

    constructor(
        private apiService: APIService
    ) {
    }

    loadCharacterTooltip(character_id: number, on_success: any, timestamp?: number): void {
        if (timestamp > 0) {
            this.apiService.get(TooltipService.URL_TOOLTIP + TooltipService.URL_CHARACTER_TOOLTIP + "/" + character_id + "/" + timestamp.toString(), on_success);
        } else {
            this.apiService.get(TooltipService.URL_TOOLTIP + TooltipService.URL_CHARACTER_TOOLTIP + "/" + character_id, on_success);
        }
    }

    loadCharacterItemTooltip(history_id: number, item_id: number, on_success: any): void {
        this.apiService.get(TooltipService.URL_TOOLTIP + TooltipService.URL_CHARACTER_ITEM_TOOLTIP + "/" + history_id + "/" + item_id, on_success);
    }

    loadGuildTooltip(guild_id: number, on_success: any): void {
        this.apiService.get(TooltipService.URL_TOOLTIP + TooltipService.URL_GUILD_TOOLTIP + "/" + guild_id, on_success);
    }

    loadItemTooltip(expansion_id: number, item_id: number, on_success: any): void {
        this.apiService.get(TooltipService.URL_TOOLTIP + TooltipService.URL_ITEM_TOOLTIP
            .replace(":expansion_id", expansion_id.toString())
            .replace(":item_id", item_id.toString()), on_success);
    }

    loadSpellTooltip(expansion_id: number, spell_id: number, on_success: any): void {
        this.apiService.get(TooltipService.URL_TOOLTIP + TooltipService.URL_SPELL_TOOLTIP
            .replace(":expansion_id", expansion_id.toString())
            .replace(":spell_id", spell_id.toString()), on_success);
    }
}
