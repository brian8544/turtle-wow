import {Component} from "@angular/core";
import {FormFailure} from "../../../../../../material/form_failure";
import {APIFailure} from "../../../../../../domain_value/api_failure";
import {UpdateMailService} from "../../service/update_mail";

@Component({
    selector: "UpdateMail",
    templateUrl: "./update_mail.html",
    styleUrls: ["./update_mail.scss"]
})
export class UpdateMailComponent {
    mail: string = '';
    formFailure: FormFailure = FormFailure.empty();
    disableSubmit: boolean = false;

    constructor(private updateMailService: UpdateMailService) {
    }

    on_submit(): void {
        this.disableSubmit = true;
        this.updateMailService.update(this.mail, () => this.on_success(), (api_failure) => this.on_failure(api_failure));
    }

    on_success(): void {
        this.disableSubmit = false;
    }

    on_failure(api_failure: APIFailure): void {
        this.formFailure = FormFailure.from(api_failure, 521, 525);
        this.disableSubmit = false;
    }
}
