import {Injectable} from "@angular/core";
import {APIService} from "src/app/service/api";

@Injectable({
    providedIn: "root",
})
export class BattlegroundSearchService {
    private static readonly URL_BATTLEGROUND_META: string = "/instance/meta_search/battlegrounds";

    constructor(
        private apiService: APIService
    ) {}

    search_battlegrounds(filter: any, on_success: any, on_failure: any): void {
        this.apiService.post(BattlegroundSearchService.URL_BATTLEGROUND_META, filter,
            (result) => on_success.call(on_success, result), on_failure);
    }
}
