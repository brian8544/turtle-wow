import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {LoadingBarService} from "../loading_bar";
import {catchError, map} from "rxjs/operators";
import {Injectable} from "@angular/core";

@Injectable()
export class LoadingBarInterceptor implements HttpInterceptor {

    constructor(private loadingBarService: LoadingBarService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!req.url.toLowerCase().includes("/api/"))
            return next.handle(req);

        this.loadingBarService.incrementCounter();
        return next.handle(req)
            .pipe(
                map((response: any) => {
                    if (response.status)
                        this.loadingBarService.decrementCounter();
                    return response;
                }),
                catchError((failure: any) => {
                    if (failure.status)
                        this.loadingBarService.decrementCounter();
                    return throwError(failure);
                })
            );
    }
}
