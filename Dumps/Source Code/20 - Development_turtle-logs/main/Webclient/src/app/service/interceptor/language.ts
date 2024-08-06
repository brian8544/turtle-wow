import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class LanguageInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!req.url.toLowerCase().includes("/api/"))
            return next.handle(req);

        req = req.clone({
            setHeaders: {
                "X-Language": "en"
            }
        });
        return next.handle(req);
    }
}
