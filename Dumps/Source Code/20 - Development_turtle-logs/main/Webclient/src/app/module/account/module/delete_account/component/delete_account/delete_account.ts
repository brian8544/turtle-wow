import {Component} from "@angular/core";
import {DeleteAccountService} from "../../service/delete_account";

@Component({
    selector: "DeleteAccount",
    templateUrl: "./delete_account.html",
    styleUrls: ["./delete_account.scss"]
})
export class DeleteAccountComponent {
    disableSubmit: boolean = false;

    constructor(private deleteAccountService: DeleteAccountService) {
    }

    deleteAccount(): void {
        this.disableSubmit = true;
        this.deleteAccountService.delete(() => this.on_response());
    }

    on_response(): void {
        this.disableSubmit = false;
    }
}
