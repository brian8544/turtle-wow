import {Component} from "@angular/core";
import {FormFailure} from "../../../../../../material/form_failure";
import {APIFailure} from "../../../../../../domain_value/api_failure";
import {UpdatePasswordService} from "../../service/update_password";

@Component({
    selector: "UpdatePassword",
    templateUrl: "./update_password.html",
    styleUrls: ["./update_password.scss"]
})
export class UpdatePasswordComponent {
    password: string = '';
    formFailure: FormFailure = FormFailure.empty();
    disableSubmit: boolean = false;

    constructor(private updatePasswordService: UpdatePasswordService) {
    }

    on_submit(): void {
        this.disableSubmit = true;
        this.updatePasswordService.update(this.password, () => this.on_success(), (api_failure) => this.on_failure(api_failure));
    }

    on_success(): void {
        this.disableSubmit = false;
    }

    on_failure(api_failure: APIFailure): void {
        this.formFailure = FormFailure.from(api_failure, 523, 524);
        this.disableSubmit = false;
    }
}
