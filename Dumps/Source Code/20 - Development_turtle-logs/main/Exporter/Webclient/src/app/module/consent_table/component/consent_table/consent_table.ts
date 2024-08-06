import {Component} from "@angular/core";
import {ConsentService} from "../../service/consent";

@Component({
    selector: "ConsentTable",
    templateUrl: "./consent_table.html",
    styleUrls: ["./consent_table.scss"]
})
export class ConsentTableComponent {

    sampleCharacters: Array<{ character_id: number, hero_class_id: number, character_name: string, consent: boolean }> = [];

    constructor(
        private consentService: ConsentService
    ) {
        this.consentService.get_characters(result => this.sampleCharacters = result);
    }

    handleConsent(character_id: number, state: boolean) {
        if (state) this.consentService.give_character_consent(character_id, () => {});
        else this.consentService.withdraw_character_consent(character_id, () => {});
    }

}
