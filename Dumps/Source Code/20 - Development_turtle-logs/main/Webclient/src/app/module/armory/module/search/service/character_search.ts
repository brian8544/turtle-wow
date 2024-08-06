import {Injectable} from "@angular/core";
import {APIService} from "../../../../../service/api";

@Injectable({
    providedIn: "root",
})
export class CharacterSearchService {
    private static readonly URL_CHARACTER_SEARCH: string = "/armory/character_search";

    constructor(
        private apiService: APIService
    ) {}

    search_characters(filter: any, on_success: any, on_failure: any): void {
        this.apiService.post(CharacterSearchService.URL_CHARACTER_SEARCH, filter,
            (result) => on_success.call(on_success, result), on_failure);
    }
}
