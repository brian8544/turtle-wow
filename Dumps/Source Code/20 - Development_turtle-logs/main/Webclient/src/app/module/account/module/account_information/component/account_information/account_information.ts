import {Component} from "@angular/core";
import {AccountInformation} from "../../../../domain_value/account_information";
import {AccountInformationService} from "../../service/account_information";
import {NotificationService} from "../../../../../../service/notification";
import {Severity} from "../../../../../../domain_value/severity";

@Component({
    selector: "AccountInformation",
    templateUrl: "./account_information.html",
    styleUrls: ["./account_information.scss"]
})
export class AccountInformationComponent {
    initialLoading: boolean = true;
    disabledSubmit: boolean = false;
    accountInformation: AccountInformation;

    constructor(
        private accountInformationService: AccountInformationService,
        private notificationService: NotificationService
    ) {
        this.accountInformationService.get((acc_info) => this.on_success(acc_info));
    }

    on_success(account_information: AccountInformation): void {
        this.accountInformation = account_information;
        this.initialLoading = false;
    }

    resend_confirmation(): void {
        this.accountInformationService.resend_confirmation(() => this.disabledSubmit = false);
    }

    get has_privacy_privilege(): boolean {
        return !!this.accountInformation && (this.accountInformation.access_rights & 4) === 4;
    }

    default_privacy_changed([privacy_type, privacy_ref]: [number, number]): void {
        this.accountInformationService.update_default_privacy(privacy_type, () => {
            this.notificationService.propagate(Severity.Success, "serverResponses.200");
        });
    }

}
