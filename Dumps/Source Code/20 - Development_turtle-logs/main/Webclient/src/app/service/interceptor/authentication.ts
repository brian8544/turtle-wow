import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {AuthenticationService} from "../authentication";
import {Router} from "@angular/router";
import {catchError, map} from "rxjs/operators";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

    constructor(
        private authenticationService: AuthenticationService,
        private routingService: Router
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!req.url.toLowerCase().includes("/api/"))
            return next.handle(req);

        req = req.clone({
            setHeaders: {
                "X-Authorization": this.authenticationService.getToken()
            }
        });
        return next.handle(req)
            .pipe(
                map((response: any) => response),
                catchError((failure: any) => {
                    if (failure.status === 401) {
                        this.authenticationService.clearToken();
                        this.routingService.navigate(["/login"]);
                    }
                    return throwError(failure);
                })
            );
    }
}
