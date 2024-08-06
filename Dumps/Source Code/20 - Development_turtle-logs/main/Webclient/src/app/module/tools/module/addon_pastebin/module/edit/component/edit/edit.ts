import {Component, OnInit} from "@angular/core";
import {DataService} from "../../../../../../../../service/data";
import {SelectOption} from "../../../../../../../../template/input/select_input/domain_value/select_option";
import {TAGS} from "../../../../../data/tags";
import {APIService} from "../../../../../../../../service/api";
import {NotificationService} from "../../../../../../../../service/notification";
import {Severity} from "../../../../../../../../domain_value/severity";
import {Paste} from "../../../../domain_value/paste";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: "Edit",
    templateUrl: "./edit.html",
    styleUrls: ["./edit.scss"]
})
export class EditComponent implements OnInit {
    private static URL_REPLACE_PASTE: string = "/utility/addon_paste"
    private static URL_GET_PASTE: string = "/utility/addon_paste/:id";

    current_id: number | undefined = undefined;

    expansions: Array<SelectOption> = [];
    selected_expansion: number = 1;

    tags: Array<any> = [];
    selected_tags: Array<any> = [];

    current_title: string = "";
    current_addon_name: string = "";
    current_desc: string = "";
    current_content: string = "";

    constructor(
        private dataService: DataService,
        private apiService: APIService,
        private notificationService: NotificationService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {
        this.expansions = this.dataService.expansions;
        this.tags = TAGS.map((tag, index) => {
            return {id: index, label: tag};
        });
    }

    ngOnInit(): void {
        this.activatedRoute.paramMap.subscribe(params => {
            if (Number(params.get("id")) <= 0)
                return;

            this.apiService.get(EditComponent.URL_GET_PASTE.replace(":id", Number(params.get("id")).toString()),
                (paste) => {
                    this.current_id = paste.id;
                    this.current_title = paste.title;
                    this.current_desc = paste.description;
                    this.current_content = paste.content;
                    this.current_addon_name = paste.addon_name;
                    this.selected_tags = this.tags.filter(item => paste.tags.includes(item.id));
                    this.selected_expansion = paste.expansion_id;
                });
        });
    }

    save_paste(): void {
        if (this.current_title.length < 1 || this.current_addon_name.length < 1 || this.current_content.length < 1 || this.current_desc.length < 1 || this.selected_tags.length < 1) {
            this.notificationService.propagate(Severity.Error, "At least one input is empty");
            return;
        }

        this.apiService.post(EditComponent.URL_REPLACE_PASTE, {
            id: this.current_id,
            title: this.current_title,
            expansion_id: Number(this.selected_expansion),
            addon_name: this.current_addon_name,
            description: this.current_desc,
            content: this.current_content,
            tags: this.selected_tags.map(item => item.id)
        } as Paste, (result) => {
           this.notificationService.propagate(Severity.Success, "Paste was created!");
           this.router.navigate(["/tools/addon_pastebin/viewer/" + result.toString()]);
        });
    }
}
