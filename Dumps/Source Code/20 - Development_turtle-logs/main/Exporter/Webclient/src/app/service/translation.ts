import {Injectable} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";

@Injectable({
    providedIn: "root",
})
export class TranslationService {
    constructor(
        private translateService: TranslateService
    ) {
        this.translateService.setDefaultLang("en");
        this.translateService.use("en");
    }
}
