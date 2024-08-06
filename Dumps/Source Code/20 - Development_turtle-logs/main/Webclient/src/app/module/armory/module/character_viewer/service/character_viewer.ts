import {Injectable} from "@angular/core";
import {APIService} from "../../../../../service/api";

@Injectable({
    providedIn: "root",
})
export class CharacterViewerService {
    private static readonly URL_ARMORY_CHARACTER_VIEWER: string = "/armory/character_viewer";
    private static readonly URL_ARMORY_CHARACTER_VIEWER_BY_HISTORY_DATE: string = "/armory/character_viewer/by_date";

    constructor(
        private apiService: APIService
    ) {
    }

    get_character_viewer(server_name: string, character_name: string, on_success: any, on_failure: any): void {
        this.apiService.get(CharacterViewerService.URL_ARMORY_CHARACTER_VIEWER + "/" + server_name + "/" + character_name,
                result => on_success.call(on_success, result), on_failure);
    }

    get_character_viewer_by_history_date(character_history_date: string, server_name: string, character_name: string, on_success: any, on_failure: any): void {
        this.apiService.get(CharacterViewerService.URL_ARMORY_CHARACTER_VIEWER_BY_HISTORY_DATE + "/" + server_name + "/" + character_name + "/" + character_history_date,
            result => on_success.call(on_success, result), on_failure);
    }
}
