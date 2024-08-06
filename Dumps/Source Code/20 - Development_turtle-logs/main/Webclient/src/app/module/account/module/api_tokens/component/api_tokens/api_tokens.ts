import {Component} from "@angular/core";
import {FormFailure} from "../../../../../../material/form_failure";
import {APITokensService} from "../../service/api_tokens";
import {APIToken} from "../../../../domain_value/api_token";
import {CreateToken} from "../../dto/create_token";
import {APIFailure} from "../../../../../../domain_value/api_failure";
import {DateService} from "../../../../../../service/date";

@Component({
    selector: "APITokens",
    templateUrl: "./api_tokens.html",
    styleUrls: ["./api_tokens.scss"]
})
export class APITokensComponent {
    disabledSubmit: boolean = false;
    formFailureDate: FormFailure = FormFailure.empty();
    formFailurePurpose: FormFailure = FormFailure.empty();
    purpose: string = '';
    exp_date: Date = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    min_exp_date: Date = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    tokenList: Array<[APIToken, boolean]> = [];
    generatedToken: APIToken;

    constructor(
        private apiTokensService: APITokensService,
        private dateService: DateService
    ) {
        this.get_tokens();
    }

    on_submit(): void {
        if (this.disabledSubmit)
            return;
        this.disabledSubmit = true;
        const create_token: CreateToken = {
            purpose: this.purpose,
            exp_date: Math.floor(this.exp_date.getTime() / 1000)
        };

        this.apiTokensService.add_token(create_token, (api_token) => this.add_token_success(api_token),
            (api_failure) => this.add_token_failure(api_failure));
    }

    delete_token(token_pair: [APIToken, boolean]) {
        token_pair[1] = true;
        this.apiTokensService.delete_token(token_pair[0].id, () => {
            const index = this.tokenList.indexOf(token_pair);
            if (index > -1)
                this.tokenList.splice(index, 1);
        }, () => token_pair[1] = false);
    }

    toEuropeanDate(timestamp: number): string {
        return this.dateService.toRPLLShortDate(timestamp * 1000);
    }

    clearGeneratedToken(): void {
        this.generatedToken = undefined;
    }

    private get_tokens(): void {
        this.apiTokensService.get((tokens) => this.retrieve_tokens(tokens));
    }

    private add_token_success(api_token: APIToken): void {
        this.tokenList.push([api_token, false]);
        this.generatedToken = api_token;
        this.disabledSubmit = false;
    }

    private add_token_failure(api_failure: APIFailure): void {
        this.disabledSubmit = false;
        this.formFailureDate = FormFailure.from(api_failure, 531, 532);
        this.formFailurePurpose = FormFailure.from(api_failure, 533);
    }

    private retrieve_tokens(api_tokens: Array<APIToken>): void {
        this.tokenList = api_tokens.map(token => [token, false]);
    }
}
