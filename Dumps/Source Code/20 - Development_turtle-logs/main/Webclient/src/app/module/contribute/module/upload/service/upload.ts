import {Injectable} from "@angular/core";
import {APIService} from "../../../../../service/api";
import {NotificationService} from "../../../../../service/notification";
import {Severity} from "../../../../../domain_value/severity";

@Injectable({
    providedIn: "root",
})
export class UploadService {
    private static readonly URL_UPLOAD: string = "/live_data_processor/upload";
    private static readonly URL_UPLOAD_PROGRESS: string = "/live_data_processor/upload/progress";

    constructor(
        private apiService: APIService
    ) {
    }

    upload_file(form_data: FormData, on_success: any, on_failure: any): void {
        this.apiService.post_form_data(UploadService.URL_UPLOAD, form_data, on_success, on_failure);
    }

    get_progress(on_success: any): void {
        this.apiService.get(UploadService.URL_UPLOAD_PROGRESS, on_success);
    }
}
