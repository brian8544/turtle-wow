import {Component, OnInit} from "@angular/core";
import {Paste} from "../../../../domain_value/paste";
import {Meta, Title} from "@angular/platform-browser";
import {TAGS} from "../../../../../data/tags";
import {NotificationService} from "../../../../../../../../service/notification";
import {Severity} from "../../../../../../../../domain_value/severity";
import {Clipboard} from "@angular/cdk/clipboard";
import {AccountInformation} from "../../../../../../../account/domain_value/account_information";
import {SettingsService} from "../../../../../../../../service/settings";
import {ActivatedRoute, Router} from "@angular/router";
import {APIService} from "../../../../../../../../service/api";

@Component({
    selector: "Viewer",
    templateUrl: "./viewer.html",
    styleUrls: ["./viewer.scss"],
})
export class ViewerComponent implements OnInit {
    private static URL_GET_PASTE: string = "/utility/addon_paste/:id";
    private static URL_DELETE_PASTE: string = "/utility/addon_paste";

    paste: Paste;

    private account_information: AccountInformation;

    constructor(
        private metaService: Meta,
        private titleService: Title,
        private notificationService: NotificationService,
        private clipboard: Clipboard,
        private settingsService: SettingsService,
        private activatedRoute: ActivatedRoute,
        private apiService: APIService,
        private router: Router
    ) {
        this.titleService.setTitle("LegacyPlayers - Addon paste viewer");
        this.metaService.updateTag({
            name: "description",
            content: "Addon configuration pastes for Vanilla, TBC and WotLK. Pastes include for example WeakAuras, ElvUi Exports or simply lua configuration."
        });
        this.activatedRoute.paramMap.subscribe(params => {
            if (Number(params.get("id")) <= 0)
                return;

            this.apiService.get(ViewerComponent.URL_GET_PASTE.replace(":id", Number(params.get("id")).toString()),
                (paste) => {
                    this.paste = paste;
                    this.titleService.setTitle(this.paste.title);
                    this.metaService.updateTag({
                        name: "description",
                        content: this.paste.description
                    });
                });
        });
    }

    ngOnInit(): void {
        this.account_information = this.settingsService.get("ACCOUNT_INFORMATION");
    }

    save_to_clipboard(): void {
        this.clipboard.copy(this.paste.content);
        this.notificationService.propagate(Severity.Success, "Paste saved to clipboard!");
    }

    delete(): void {
        this.apiService.delete(ViewerComponent.URL_DELETE_PASTE, this.paste.id, () => {
            this.notificationService.propagate(Severity.Success, "Paste deleted!");
            this.router.navigate(["/tools/addon_pastebin"]);
        });
    }

    get tags(): string {
        if (!this.paste)
            return "";
        return this.paste.tags.map(tag => TAGS[tag]).join(", ");
    }

    get is_paste_owner(): boolean {
        return !!this.account_information && !!this.paste && (this.account_information.id === this.paste.member_id || (this.account_information.access_rights & 1) === 1);
    }
}
