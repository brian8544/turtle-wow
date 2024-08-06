import {Component} from "@angular/core";
import {LoginService} from "../../service/login";
import {LoginForm} from "../../dto/login_form";
import {APIFailure} from "../../../../domain_value/api_failure";
import {FormFailure} from "../../../../material/form_failure";

@Component({
    selector: "Login",
    templateUrl: "./login.html",
    styleUrls: ["./login.scss"]
})
export class LoginComponent {
    formFailure: FormFailure = FormFailure.empty();
    disableSubmit = false;
    model: LoginForm = {
        mail: "",
        password: ""
    };

    constructor(private loginService: LoginService) {
    }

    onSubmit(): void {
        if (!this.disableSubmit) {
            this.disableSubmit = true;
            this.loginService.signIn(this.model, () => this.on_success(), callback => this.on_failure(callback));
        }
    }

    private on_success(): void {
        this.disableSubmit = false;
    }

    private on_failure(api_failure: APIFailure): void {
        this.formFailure = FormFailure.from(api_failure, 520);
        this.disableSubmit = false;
    }
}
