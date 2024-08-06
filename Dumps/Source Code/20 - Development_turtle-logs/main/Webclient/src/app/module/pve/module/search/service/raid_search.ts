import {Injectable} from "@angular/core";
import {APIService} from "../../../../../service/api";

@Injectable({
    providedIn: "root",
})
export class RaidSearchService {
    private static readonly URL_RAIDS_META: string = "/instance/meta_search/raids";
    private static readonly URL_DELETE_RAID: string = "/instance/delete";

    constructor(
        private apiService: APIService
    ) {
    }

    search_raids(filter: any, on_success: any, on_failure: any): void {
        this.apiService.post(RaidSearchService.URL_RAIDS_META, filter,
            (result) => on_success.call(on_success, result), on_failure);
    }

    delete_raid(instance_meta_id: number, on_success: any): void {
        this.apiService.delete(RaidSearchService.URL_DELETE_RAID, instance_meta_id, (result) => on_success.call(on_success, result));
    }
}
