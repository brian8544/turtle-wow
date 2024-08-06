import {Component, EventEmitter, Output} from "@angular/core";
import {environment} from "src/environments/environment";

@Component({
    selector: "FooterBar",
    templateUrl: "./footer_bar.html",
    styleUrls: ["./footer_bar.scss"]
})
export class FooterBarComponent {
    @Output() consent: EventEmitter<boolean> = new EventEmitter();

    copyRightArguments: any = {company: environment.company, year: (new Date()).getFullYear().toString()};
    githubLink: string = environment.github;
    discordLink: string = environment.discord;

    show_consent(): void {
        this.consent.emit(true);
    }
}
