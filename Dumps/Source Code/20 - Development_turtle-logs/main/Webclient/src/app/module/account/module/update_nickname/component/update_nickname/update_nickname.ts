import {Component} from "@angular/core";
import {UpdateNicknameService} from "../../service/update_nickname";
import {FormFailure} from "../../../../../../material/form_failure";
import {APIFailure} from "../../../../../../domain_value/api_failure";

@Component({
    selector: "UpdateNickname",
    templateUrl: "./update_nickname.html",
    styleUrls: ["./update_nickname.scss"]
})
export class UpdateNicknameComponent {
    nickname: string = '';
    disableSubmit: boolean = false;
    formFailure: FormFailure = FormFailure.empty();

    constructor(private updateNicknameService: UpdateNicknameService) {
    }

    on_submit(): void {
        this.disableSubmit = true;
        this.updateNicknameService.update(this.nickname, () => this.on_success(), (api_failure) => this.on_failure(api_failure));
    }

    on_success(): void {
        this.disableSubmit = false;
    }

    on_failure(api_failure: APIFailure): void {
        this.formFailure = FormFailure.from(api_failure, 522, 526);
        this.disableSubmit = false;
    }
}
