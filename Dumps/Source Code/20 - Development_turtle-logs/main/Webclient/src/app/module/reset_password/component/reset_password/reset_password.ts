import {Component} from "@angular/core";
import {ResetPasswordService} from "../../service/reset_password";
import {FormFailure} from "../../../../material/form_failure";
import {APIFailure} from "../../../../domain_value/api_failure";

@Component({
    selector: "ResetPassword",
    templateUrl: "./reset_password.html",
    styleUrls: ["./reset_password.scss"]
})
export class ResetPasswordComponent {
    mail: string = '';
    disabledSubmit: boolean = false;
    formFailure: FormFailure = FormFailure.empty();

    constructor(private resetPasswordService: ResetPasswordService) {
    }

    on_submit(): void {
        this.resetPasswordService.reset_password(this.mail, () => this.on_success(), (api_failure) => this.on_failure(api_failure));
    }

    on_success(): void {
        this.disabledSubmit = false;
    }

    on_failure(api_failure: APIFailure): void {
        this.formFailure = FormFailure.from(api_failure, 521);
        this.disabledSubmit = false;
    }

}
