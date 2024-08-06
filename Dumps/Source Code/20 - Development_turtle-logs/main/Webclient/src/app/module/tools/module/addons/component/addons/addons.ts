import {Component, OnInit} from "@angular/core";
import {HeaderColumn} from "../../../../../../template/table/module/table_header/domain_value/header_column";
import {BodyColumn} from "../../../../../../template/table/module/table_body/domain_value/body_column";
import {DataService} from "../../../../../../service/data";
import {SettingsService} from "../../../../../../service/settings";
import {table_init_filter} from "../../../../../../template/table/utility/table_init_filter";
import {APIService} from "../../../../../../service/api";
import {Meta, Title} from "@angular/platform-browser";

@Component({
    selector: "Addons",
    templateUrl: "./addons.html",
    styleUrls: ["./addons.scss"]
})
export class AddonsComponent implements OnInit {
    private static URL_ADDONS: string = "/data/addon";

    header_columns: Array<HeaderColumn> = [
        {index: 0, filter_name: 'name', labelKey: "Addon.name", type: 0, type_range: null, col_type: 3},
        {
            index: 1,
            filter_name: 'expansion',
            labelKey: "Addon.expansion",
            type: 3,
            type_range: [{value: -1, label_key: "Addon.expansion"}],
            col_type: 3
        },
        {index: 2, filter_name: 'description', labelKey: "Addon.description", type: 0, type_range: null, col_type: 0},
    ];
    clientSide: boolean = true;
    responsiveHeadColumns: Array<number> = [0];
    responsiveModeWidthInPx: number = 500;
    current_addons: Array<Array<BodyColumn>> = [];
    total_num: number = 0;

    expansions: Map<number, string> = new Map([[1, "Vanilla"], [2, "TBC"], [3, "WotLK"]]);

    constructor(
        private dataService: DataService,
        private settingsService: SettingsService,
        private apiService: APIService,
        private metaService: Meta,
        private titleService: Title
    ) {
        this.titleService.setTitle("LegacyPlayers - Addons");
        this.metaService.updateTag({
            name: "description",
            content: "Download addons for Vanilla (1.12.1), TBC (2.4.3) and WotLK (3.3.5a)."
        });

        for (const expansion of this.dataService.expansions) {
            this.header_columns[1].type_range.push({
                value: expansion.value,
                label_key: expansion.label_key
            });
        }
    }

    ngOnInit(): void {
        const filter = table_init_filter(this.header_columns);
        if (!this.settingsService.check("table_filter_addon_search")) {
            filter.name.sorting = false;
            this.settingsService.set("table_filter_addon_search", filter);
        }
        this.apiService.get(AddonsComponent.URL_ADDONS, (addons) => {
            this.current_addons = addons.map(addon => {
                return {
                    color: "", columns: [
                        {
                            type: 0,
                            content: addon.addon_name,
                            args: {
                                url_name: addon.url_name,
                                expansion_id: addon.expansion_id
                            }
                        },
                        {
                            type: 3,
                            content: addon.expansion_id,
                            args: null
                        },
                        {
                            type: 0,
                            content: addon.addon_desc,
                            args: null
                        }
                    ]
                };
            });
        });
    }
}
