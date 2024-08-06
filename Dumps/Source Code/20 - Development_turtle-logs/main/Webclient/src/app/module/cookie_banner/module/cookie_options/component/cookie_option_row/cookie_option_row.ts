import {Component, Input} from "@angular/core";
import {CookieOption} from "src/app/module/cookie_banner/material/cookie_option";

@Component({
    selector: "CookieOptionRow",
    templateUrl: "./cookie_option_row.html",
    styleUrls: ["./cookie_option_row.scss"]
})
export class CookieOptionRowComponent {
    @Input() cookie: CookieOption;
}
