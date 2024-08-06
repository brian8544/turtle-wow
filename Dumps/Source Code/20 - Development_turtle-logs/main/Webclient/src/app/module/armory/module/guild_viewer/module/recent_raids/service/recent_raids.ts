import {Injectable} from "@angular/core";
import {APIService} from "../../../../../../../service/api";

@Injectable({
    providedIn: "root",
})
export class RecentRaidsService {
    private static readonly URL_INSTANCE_RAIDS: string = "/instance/meta_search/raids";

    constructor(
        private apiService: APIService
    ) {
    }

    get_recent_raids(filter: any, on_success: any, on_failure: any): void {
        this.apiService.post(RecentRaidsService.URL_INSTANCE_RAIDS, filter,
            result => on_success.call(on_success, result), on_failure);
    }
}
