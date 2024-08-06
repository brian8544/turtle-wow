import {Component} from "@angular/core";
import {environment} from "../../../../../environments/environment";

@Component({
    selector: "FooterBar",
    templateUrl: "./footer_bar.html",
    styleUrls: ["./footer_bar.scss"]
})
export class FooterBarComponent {
    copyRightArguments: any = {company: environment.company, year: (new Date()).getFullYear().toString()};
    legacyplayersLink: string = environment.legacyplayersLink;
    githubLink: string = environment.githubLink;
}
