import {Component, OnInit} from "@angular/core";
import {HeaderColumn} from "../../../../../../template/table/module/table_header/domain_value/header_column";
import {BodyColumn} from "../../../../../../template/table/module/table_body/domain_value/body_column";
import {CharacterSearchService} from "../../service/character_search";
import {table_init_filter} from "../../../../../../template/table/utility/table_init_filter";
import {DataService} from "../../../../../../service/data";
import {AvailableServer} from "../../../../../../domain_value/available_server";
import {Localized} from "../../../../../../domain_value/localized";
import {HeroClass} from "../../../../../../domain_value/hero_class";
import {SettingsService} from "src/app/service/settings";
import {TinyUrlService} from "../../../../../tiny_url/service/tiny_url";
import {DateService} from "../../../../../../service/date";
import {Meta, Title} from "@angular/platform-browser";

@Component({
    selector: "Search",
    templateUrl: "./search.html",
    styleUrls: ["./search.scss"],
    providers: [
        TinyUrlService
    ]
})
export class SearchComponent implements OnInit {

    character_header_columns: Array<HeaderColumn> = [
        {
            index: 0,
            filter_name: 'hero_class',
            labelKey: "Armory.Search.hero_class",
            type: 3,
            type_range: [{value: -1, label_key: "Armory.Search.hero_class"}],
            col_type: 1
        },
        {index: 1, filter_name: 'name', labelKey: "Armory.Search.name", type: 0, type_range: null, col_type: 0},
        {index: 2, filter_name: 'guild', labelKey: "Armory.Search.guild", type: 0, type_range: null, col_type: 0},
        {
            index: 3,
            filter_name: 'server',
            labelKey: "Armory.Search.server",
            type: 3,
            type_range: [{value: -1, label_key: "Armory.Search.server"}],
            col_type: 0
        },
        {
            index: 4,
            filter_name: 'last_updated',
            labelKey: "Armory.Search.last_update",
            type: 2,
            type_range: null,
            col_type: 1
        },
    ];
    character_body_columns: Array<Array<BodyColumn>> = [];
    clientSide: boolean = false;
    responsiveHeadColumns: Array<number> = [0, 1];
    responsiveModeWidthInPx: number = 840;
    num_characters: number = 0;

    // TODO: Refactor
    current_servers: Array<AvailableServer> = [];

    constructor(
        private characterSearchService: CharacterSearchService,
        private dataService: DataService,
        private settingsService: SettingsService,
        public tinyUrlService: TinyUrlService,
        public dateService: DateService,
        private metaService: Meta,
        private titleService: Title
    ) {
        this.titleService.setTitle("LegacyPlayers - Armory search");
        this.metaService.updateTag({name: "description", content: "Search for players and guilds on Legacyplayers."});

        this.dataService.hero_classes.subscribe((hero_classes: Array<Localized<HeroClass>>) =>
            hero_classes.forEach(hero_class => this.character_header_columns[0].type_range.push({
                value: hero_class.base.id,
                label_key: hero_class.localization
            })));
        this.dataService.servers.subscribe((servers: Array<AvailableServer>) => {
            this.current_servers = servers;
            servers.forEach(server => this.character_header_columns[3].type_range.push({
                value: server.id,
                label_key: server.name + " (" + server.patch + ")"
            }));
        });
    }

    ngOnInit(): void {
        const filter = table_init_filter(this.character_header_columns);
        if (!this.settingsService.check("table_filter_armory_search")) {
            filter.last_updated.sorting = false;
            this.settingsService.set("table_filter_armory_search", filter);
        }
        this.filterCharacterSearch(this.settingsService.get("table_filter_armory_search"));
    }

    filterCharacterSearch(filter: any): void {
        this.characterSearchService.search_characters(filter,
            (search_result) => {
                this.num_characters = search_result.num_items;
                this.character_body_columns = search_result.result.map(row => {
                    const body_columns: Array<BodyColumn> = [];
                    // TODO: Needs to be refactored
                    const server_name = this.current_servers.find(server => server.id === row.character.server_id)?.name;

                    body_columns.push({
                        type: 3,
                        content: row.character.hero_class_id.toString(),
                        args: null
                    });
                    body_columns.push({
                        type: 0,
                        content: row.character.name,
                        args: {
                            server_name,
                            character_id: row.character.character_id
                        }
                    });
                    body_columns.push({
                        type: 0,
                        content: !row.guild ? '' : row.guild.name,
                        args: {
                            server_name,
                            guild_id: !row.guild ? 0 : row.guild.guild_id
                        }
                    });
                    body_columns.push({
                        type: 3,
                        content: row.character.server_id.toString(),
                        args: null
                    });
                    body_columns.push({
                        type: 2,
                        content: (row.timestamp * 1000).toString(),
                        args: null
                    });

                    // TODO: Dont save faction color here
                    return {
                        color: row.faction ? '#372727' : '#272f37',
                        columns: body_columns
                    };
                });
            },
            () => {
            });
    }

}
