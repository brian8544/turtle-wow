import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {NotificationService} from "./notification";
import {Severity} from "../domain_value/severity";
import {APIFailure} from "../domain_value/api_failure";
import {Observable} from "rxjs";

@Injectable({
    providedIn: "root",
})
export class APIService {
    private static readonly API_PREFIX: string = "/rpll/API";

    constructor(private httpClient: HttpClient,
                private notificationService: NotificationService) {
    }

    get<T>(url: string, on_success?: (T) => void, on_failure?: (any) => void): void {
        this.handleRequest(this.httpClient.get<T>(APIService.API_PREFIX + url), on_success, on_failure);
    }

    post<T1, T2>(url: string, body: T2, on_success?: (T1) => void, on_failure?: any): void {
        this.handleRequest(this.httpClient.post(APIService.API_PREFIX + url, JSON.stringify(body)), on_success, on_failure);
    }

    delete(url: string, body: any, on_success?: any, on_failure?: any): void {
        this.handleRequest(this.httpClient.request("delete", APIService.API_PREFIX + url, {
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
        const api_failure: APIFailure = {
            status: reason.status,
            translation: "serverResponses." + reason.status,
            arguments: {
                arg1: reason.error
            }
        };
        this.notificationService.propagate(Severity.Error, api_failure.translation, api_failure.arguments);
        return api_failure;
    }
}
