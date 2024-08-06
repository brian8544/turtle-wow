import {Injectable} from "@angular/core";
import {APIService} from "../../../../../service/api";

@Injectable({
    providedIn: "root",
})
export class UploadsService {
    private static readonly URL_RAIDS_META: string = "/instance/meta_search/raids/by_member_id";
    private static readonly URL_DELETE_RAID: string = "/instance/delete";
    private static readonly URL_UPDATE_PRIVACY: string = "/instance/meta/update_privacy";

    constructor(
        private apiService: APIService
    ) {
    }

    search_raids(filter: any, on_success: any, on_failure: any): void {
        this.apiService.post(UploadsService.URL_RAIDS_META, filter,
            (result) => on_success.call(on_success, result), on_failure);
    }

    delete_raid(instance_meta_id: number, on_success: any): void {
        this.apiService.delete(UploadsService.URL_DELETE_RAID, instance_meta_id, (result) => on_success.call(on_success, result));
    }

    update_privacy(instance_meta_id: number, privacy_option: number, privacy_group: number, on_success: any, on_failure: any): void {
        this.apiService.post(UploadsService.URL_UPDATE_PRIVACY, {
            instance_meta_id,
            privacy_option,
            privacy_group
        }, on_success, on_failure);
    }
}
