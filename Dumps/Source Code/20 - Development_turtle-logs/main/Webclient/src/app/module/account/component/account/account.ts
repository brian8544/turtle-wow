import {Component} from "@angular/core";
import {AccountService} from "../../service/account";

@Component({
    selector: "Account",
    templateUrl: "./account.html",
    styleUrls: ["./account.scss"]
})
export class AccountComponent {
    settings: Array<Array<string>> = [
        ["./", "Account.navBar.entries.overview"],
        ["uploads", "Account.navBar.entries.uploads"],
        ["nickname", "Account.navBar.entries.nickname"],
        ["password", "Account.navBar.entries.password"],
        ["mail", "Account.navBar.entries.mail"],
        ["api", "Account.navBar.entries.api"],
        ["delete", "Account.navBar.entries.delete"],
    ];

    constructor(private accountService: AccountService) {
    }
}
