import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {NotificationService} from "./notification";
import {Severity} from "../domain_value/severity";
import {APIFailure} from "../domain_value/api_failure";
import {Observable} from "rxjs";

const HttpJsonOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
};

const HttpUploadOptions = {
    headers: new HttpHeaders({ Accept: "application/json" })
};

@Injectable({
    providedIn: "root",
})
export class APIService {
    private static readonly API_PREFIX: string = "/API";

    constructor(private httpClient: HttpClient,
                private notificationService: NotificationService) {
    }

    get<T>(url: string, on_success?: (T) => void, on_failure?: (any) => void): void {
        this.handleRequest(this.httpClient.get<T>(APIService.API_PREFIX + url, HttpJsonOptions), on_success, on_failure);
    }

    post<T1, T2>(url: string, body: T2, on_success?: (T1) => void, on_failure?: any): void {
        this.handleRequest(this.httpClient.post(APIService.API_PREFIX + url, JSON.stringify(body), HttpJsonOptions), on_success, on_failure);
    }

    post_form_data(url: string, body: FormData, on_success?: any, on_failure?: any): void {
        this.handleRequest(this.httpClient.post<any>(APIService.API_PREFIX + url, body, HttpUploadOptions), on_success, on_failure);
    }

    delete(url: string, body: any, on_success?: any, on_failure?: any): void {
        this.handleRequest(this.httpClient.request("delete", APIService.API_PREFIX + url, {
            headers: new HttpHeaders({ Accept: "application/json" }),
            body: JSON.stringify(body)
        }), on_success, on_failure);
    }

    private handleRequest(request: Observable<any>, on_success?: any, on_failure?: any): void {
        request.toPromise()
            .then(response => {
                if (!!on_success)
                    on_success.call(on_success, response);
            })
            .catch(reason => {
                const failure = this.handleFailure(reason);
                if (!!on_failure)
                    on_failure.call(on_failure, failure);
            });
    }

    private handleFailure(reason: HttpErrorResponse): APIFailure {
        let status = reason.status;
        if (reason.url?.includes("live_data_processor/upload") && reason.status === 502) {
            status = 4012;
        }
        if (!reason.url && !reason.status) {
            (reason as any).status = 599;
        }

        const api_failure: APIFailure = {
            status,
            translation: "serverResponses." + status,
            arguments: {
                arg1: reason.error
            }
        };
        if (![404].includes(status))
            this.notificationService.propagate(Severity.Error, api_failure.translation, api_failure.arguments);
        return api_failure;
    }
}
