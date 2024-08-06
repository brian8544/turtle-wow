import {Injectable} from "@angular/core";
import {APIService} from "src/app/service/api";

@Injectable({
    providedIn: "root",
})
export class SkirmishSearchService {
    private static readonly URL_SKIRMISH_META: string = "/instance/meta_search/skirmishes";

    constructor(
        private apiService: APIService
    ) {}

    search_skirmishes(filter: any, on_success: any, on_failure: any): void {
        this.apiService.post(SkirmishSearchService.URL_SKIRMISH_META, filter,
            (result) => on_success.call(on_success, result), on_failure);
    }
}
