import {Injectable} from "@angular/core";
import {APIService} from "../../../../../../../service/api";

@Injectable({
    providedIn: "root",
})
export class AttendedRaidsService {
    private static readonly URL_RAIDS_META: string = "/instance/meta_search/raids/by_character_id";

    constructor(
        private apiService: APIService
    ) {
    }

    search_raids(filter: any, character_id: number, on_success: any, on_failure: any): void {
        this.apiService.post(AttendedRaidsService.URL_RAIDS_META, [character_id, filter],
            (result) => on_success.call(on_success, result), on_failure);
    }

}
