import {Component, Input, OnChanges, OnInit} from "@angular/core";
import {TinyUrlService} from "../../../../../../../tiny_url/service/tiny_url";
import {HeaderColumn} from "../../../../../../../../template/table/module/table_header/domain_value/header_column";
import {BodyRow} from "../../../../../../../../template/table/module/table_body/domain_value/body_row";
import {Router} from "@angular/router";
import {DataService} from "../../../../../../../../service/data";
import {SettingsService} from "../../../../../../../../service/settings";
import {table_init_filter} from "../../../../../../../../template/table/utility/table_init_filter";
import {GuildViewerMemberDto} from "../../domain_value/guild_viewer_member_dto";
import {BodyColumn} from "../../../../../../../../template/table/module/table_body/domain_value/body_column";
import {GuildRosterService} from "../../service/guild_roster";
import {Localized} from "../../../../../../../../domain_value/localized";
import {HeroClass} from "../../../../../../../../domain_value/hero_class";
import {GuildRank} from "../../../../../../domain_value/guild_rank";

@Component({
    selector: "GuildRoster",
    templateUrl: "./guild_roster.html",
    styleUrls: ["./guild_roster.scss"],
    providers: [
        TinyUrlService
    ]
})
export class GuildRosterComponent implements OnInit, OnChanges {

    @Input() server_name: string;
    @Input() guild_id: number;
    @Input() ranks: Array<GuildRank>;

    responsiveModeWidthInPx: number = 600;
    responsiveHeadColumns: Array<number> = [0, 1];
    member_header_columns: Array<HeaderColumn> = [
        {
            index: 0,
            filter_name: 'hero_class',
            labelKey: "Armory.GuildViewer.hero_class",
            type: 3,
            type_range: [{value: -1, label_key: "Armory.GuildViewer.hero_class"}],
            col_type: 1
        },
        {index: 1, filter_name: 'name', labelKey: "Armory.GuildViewer.name", type: 0, type_range: null, col_type: 0},
        {
            index: 2, filter_name: 'rank', labelKey: "Armory.GuildViewer.rank",
            type: 3, type_range: [{value: -1, label_key: "Armory.GuildViewer.rank"}], col_type: 0
        },
        {
            index: 3,
            filter_name: 'last_updated',
            labelKey: "Armory.GuildViewer.last_update",
            type: 2,
            type_range: null,
            col_type: 1
        },
    ];
    member_body_rows: Array<BodyRow> = [];

    constructor(
        private routerService: Router,
        private dataService: DataService,
        private settingsService: SettingsService,
        public tinyUrlService: TinyUrlService,
        private guildRosterService: GuildRosterService
    ) {
        this.dataService.hero_classes.subscribe((hero_classes: Array<Localized<HeroClass>>) => hero_classes.forEach(hero_class => this.member_header_columns[0].type_range.push({
            value: hero_class.base.id,
            label_key: hero_class.localization
        })));
    }

    ngOnInit(): void {
        if (!this.settingsService.check("table_filter_guild_viewer_member")) {
            const filter = table_init_filter(this.member_header_columns);
            filter.rank.sorting = true;
            filter.last_updated.sorting = false;
            this.settingsService.set("table_filter_guild_viewer_member", filter);
        }
    }

    ngOnChanges(changes: any) {
        if (changes.guild_id !== this.guild_id) {
            this.loadGuild();
        }
        if (changes.ranks !== this.ranks && !!this.ranks) {
            this.member_header_columns[2].type_range = [{value: -1, label_key: "Armory.GuildViewer.rank"}];
            this.ranks.forEach(entry => this.member_header_columns[2].type_range.push({
                value: entry.index,
                label_key: entry.name
            }));
        }
    }

    private loadGuild(): void {
        if (!this.guild_id)
            return;

        this.guildRosterService.get_guild_roster(this.guild_id, result => {
            this.setMemberBodyRows(result);
        }, () => {
            this.routerService.navigate(['/404']);
        });
    }

    private setMemberBodyRows(member: Array<GuildViewerMemberDto>): void {
        this.member_body_rows = member.map(entry => {
            const body_columns: Array<BodyColumn> = [];

            body_columns.push({
                type: 3,
                content: entry.hero_class_id.toString(),
                args: null
            });
            body_columns.push({
                type: 0,
                content: entry.character_name.toString(),
                args: {
                    server_name: this.server_name,
                    character_id: entry.character_id
                }
            });
            body_columns.push({
                type: 3,
                content: entry.rank_index.toString(),
                args: null
            });
            body_columns.push({
                type: 2,
                content: entry.last_seen.toString(),
                args: null
            });

            return {
                color: entry.faction ? '#372727' : '#272f37',
                columns: body_columns
            };
        });
    }

    get url_suffix(): string {
        return window.location.href.replace(window.location.origin + "/armory/guild/", "");
    }

}
