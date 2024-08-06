import {Component} from "@angular/core";
import {SignUpService} from "../../service/sign_up";
import {SignUpForm} from "../../dto/sign_up_form";
import {FormFailure} from "../../../../material/form_failure";
import {APIFailure} from "../../../../domain_value/api_failure";
import {Severity} from "../../../../domain_value/severity";
import {NotificationService} from "../../../../service/notification";

@Component({
    selector: "SignUp",
    templateUrl: "./sign_up.html",
    styleUrls: ["./sign_up.scss"]
})
export class SignUpComponent {
    formFailureNickname: FormFailure = FormFailure.empty();
    formFailureMail: FormFailure = FormFailure.empty();
    formFailurePassword: FormFailure = FormFailure.empty();
    disableSubmit = false;
    model: SignUpForm = {
        nickname: "",
        credentials: {
            mail: "",
            password: ""
        }
    };

    constructor(private signUpService: SignUpService,
                private notificationService: NotificationService) {
    }

    onSubmit(): void {
        if (!this.disableSubmit) {
            this.disableSubmit = true;
            this.signUpService.signUp(this.model, () => this.on_success(), callback => this.on_failure(callback));
        }
    }

    on_success(): void {
        this.disableSubmit = false;
        this.notificationService.propagate(Severity.Info, 'serverResponses.mail_confirm');
    }

    on_failure(api_failure: APIFailure): void {
        this.formFailureNickname = FormFailure.from(api_failure, 522, 526);
        this.formFailureMail = FormFailure.from(api_failure, 521, 525);
        this.formFailurePassword = FormFailure.from(api_failure, 523, 524, 535);
        this.disableSubmit = false;
    }
}
