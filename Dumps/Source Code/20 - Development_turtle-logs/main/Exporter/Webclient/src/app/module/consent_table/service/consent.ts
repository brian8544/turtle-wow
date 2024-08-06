import {Injectable} from "@angular/core";
import {APIService} from "../../../service/api";

@Injectable({
    providedIn: "root",
})
export class ConsentService {
    private static readonly URL_CONSENT_CHARACTER: string = "/consent_manager/character";

    constructor(
        private apiService: APIService
    ) {
    }

    get_characters(on_success: any): void {
        this.apiService.get(ConsentService.URL_CONSENT_CHARACTER, on_success);
    }

    give_character_consent(character_id: number, on_success: any): void {
        this.apiService.post(ConsentService.URL_CONSENT_CHARACTER + '/' + character_id, on_success);
    }

    withdraw_character_consent(character_id: number, on_success: any): void {
        this.apiService.delete(ConsentService.URL_CONSENT_CHARACTER + '/' + character_id, on_success);
    }

}
