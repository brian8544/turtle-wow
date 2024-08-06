import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Router} from "@angular/router";
import {catchError, map} from "rxjs/operators";
import {SettingsService} from "../settings";
import {APIToken} from "../../domain_value/api_token";

export class AuthenticationInterceptor implements HttpInterceptor {

    constructor(
        private settingsService: SettingsService,
        private routingService: Router
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!req.url.toLowerCase().includes("/api/"))
            return next.handle(req);

        // Check if the token exists
        if (!this.settingsService.check("API_TOKEN")) {
            this.routingService.navigate(["/"]);
            return;
        }
        const api_token: APIToken = this.settingsService.get("API_TOKEN");

        req = req.clone({
            setHeaders: {
                "Content-Type": "application/json",
                "X-Authorization": api_token.token + "|" + api_token.account_id.toString()
            }
        });
        return next.handle(req)
            .pipe(
                map((response: any) => response),
                catchError((failure: any) => {
                    if (failure.status === 401) {
                        this.settingsService.set("API_TOKEN", undefined);
                        this.routingService.navigate(["/"]);
                    }
                    return throwError(failure);
                })
            );
    }
}
