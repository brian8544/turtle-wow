import {Component} from "@angular/core";
import {HeaderColumn} from "../../../../../../../../template/table/module/table_header/domain_value/header_column";
import {BodyColumn} from "../../../../../../../../template/table/module/table_body/domain_value/body_column";
import {DataService} from "../../../../../../../../service/data";
import {SettingsService} from "../../../../../../../../service/settings";
import {APIService} from "../../../../../../../../service/api";
import {Meta, Title} from "@angular/platform-browser";
import {table_init_filter} from "../../../../../../../../template/table/utility/table_init_filter";
import {TAGS} from "../../../../../data/tags";

@Component({
    selector: "Search",
    templateUrl: "./search.html",
    styleUrls: ["./search.scss"]
})
export class SearchComponent {
    private static URL_ADDON_PASTEBIN_SEARCH: string = "/utility/addon_paste";

    header_columns: Array<HeaderColumn> = [
        {index: 0, filter_name: 'title', labelKey: "AddonPastebin.Search.title", type: 0, type_range: null, col_type: 1},
        {index: 1, filter_name: 'addon_name', labelKey: "AddonPastebin.Search.addon_name", type: 0, type_range: null, col_type: 2},
        {
            index: 2,
            filter_name: 'expansion',
            labelKey: "AddonPastebin.Search.expansion",
            type: 3,
            type_range: [{value: -1, label_key: "AddonPastebin.Search.expansion"}],
            col_type: 3
        },
        {index: 3, filter_name: 'tags', labelKey: "AddonPastebin.Search.tags", type: 0, type_range: null, col_type: 1},
        {index: 4, filter_name: 'description', labelKey: "AddonPastebin.Search.description", type: 0, type_range: null, col_type: 0},
    ];
    clientSide: boolean = true;
    responsiveHeadColumns: Array<number> = [0, 1];
    responsiveModeWidthInPx: number = 600;
    current_addons: Array<Array<BodyColumn>> = [];
    total_num: number = 0;

    is_logged_in: boolean = false;

    constructor(
        private dataService: DataService,
        private settingsService: SettingsService,
        private apiService: APIService,
        private metaService: Meta,
        private titleService: Title
    ) {
        this.titleService.setTitle("LegacyPlayers - Addon pastebin search");
        this.metaService.updateTag({
            name: "description",
            content: "Addon configuration pastes for Vanilla, TBC and WotLK. Pastes include for example WeakAuras, ElvUi Exports or simply lua configuration."
        });

        for (const expansion of this.dataService.expansions) {
            this.header_columns[2].type_range.push({
                value: expansion.value,
                label_key: expansion.label_key
            });
        }
    }

    ngOnInit(): void {
        const filter = table_init_filter(this.header_columns);
        if (!this.settingsService.check("table_filter_addon_pastebin_search")) {
            filter.title.sorting = false;
            this.settingsService.set("table_filter_addon_pastebin_search", filter);
        }
        this.is_logged_in = this.settingsService.check("API_TOKEN");

        this.apiService.get(SearchComponent.URL_ADDON_PASTEBIN_SEARCH, (pastes) => {
            this.current_addons = pastes.map(paste => {
                return {
                    color: "", columns: [
                        {
                            type: 0,
                            content: paste.title,
                            args: {
                                id: paste.id,
                            }
                        },
                        {
                            type: 0,
                            content: paste.addon_name,
                            args: null
                        },
                        {
                            type: 3,
                            content: paste.expansion_id,
                            args: null
                        },
                        {
                            type: 0,
                            content: paste.tags.map(id => TAGS[id]).join(", "),
                            args: null
                        },
                        {
                            type: 0,
                            content: paste.description,
                            args: null
                        }
                    ]
                };
            });
        });
    }
}
