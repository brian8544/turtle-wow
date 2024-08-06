import {Injectable} from "@angular/core";
import {APIService} from "src/app/service/api";

@Injectable({
    providedIn: "root",
})
export class ArenaSearchService {
    private static readonly URL_ARENA_META: string = "/instance/meta_search/rated_arena";

    constructor(
        private apiService: APIService
    ) {}

    search_arenas(filter: any, on_success: any, on_failure: any): void {
        this.apiService.post(ArenaSearchService.URL_ARENA_META, filter,
            (result) => on_success.call(on_success, result), on_failure);
    }
}
