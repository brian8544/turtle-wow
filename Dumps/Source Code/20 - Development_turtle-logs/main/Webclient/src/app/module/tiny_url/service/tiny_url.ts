import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";
import {APIService} from "src/app/service/api";
import {TinyUrl} from "../domain_value/tiny_url";
import {SettingsService} from "src/app/service/settings";
import {TinyUrlDto} from "../dto/tiny_url_dto";
import {TableUrl} from "../domain_value/table_url";
import {NotificationService} from "src/app/service/notification";
import {Severity} from "../../../domain_value/severity";
import {Clipboard} from "@angular/cdk/clipboard";
import {RankingUrl} from "../domain_value/ranking_url";

@Injectable({
    providedIn: "root",
})
export class TinyUrlService {
    private static readonly URL_UTILITY_TINY_URL: string = "/utility/tiny_url/:id";
    private static readonly URL_UTILITY_TINY_URL_SET: string = "/utility/tiny_url";

    private static readonly NAVIGATION_META: Map<number, [string, string]> = new Map([
        [1, ["/pve", "table_filter_raids_search"]],
        [2, ["/armory", "table_filter_armory_search"]],
        [3, ["/pvp/battleground", "table_filter_battlegrounds_search"]],
        [4, ["/pvp/arena", "table_filter_rated_arenas_search"]],
        [5, ["/pvp/skirmish", "table_filter_skirmishes_search"]],
        [6, ["/armory/character/:url_suffix", "table_filter_viewer_ranking_table"]],
        [7, ["/armory/guild/:url_suffix", "table_filter_guild_viewer_member"]],
        [8, ["/pve/ranking", "pve_ranking"]],
        [9, ["/viewer/:url_suffix", "viewer_export::instance_meta_id"]],
        [10, ["/pve/speed_run", "pve_speed_run"]],
        [11, ["/pve/speed_kill", "pve_speed_kill"]],
    ]);

    private redirect_url$: Subject<string> = new Subject();
    private failure$: Subject<void> = new Subject();

    constructor(
        private apiService: APIService,
        private settingsService: SettingsService,
        private notificationService: NotificationService,
        private clipboardService: Clipboard
    ) {
    }

    get redirect_url(): Observable<string> {
        return this.redirect_url$.asObservable();
    }

    get failure(): Observable<void> {
        return this.failure$.asObservable();
    }

    load_tiny_url(id: number): void {
        this.apiService.get(TinyUrlService.URL_UTILITY_TINY_URL.replace(":id", id.toString()),
            result => this.process_tiny_url(result),
            () => this.failure$.next());
    }

    set_tiny_url<T>(tiny_url: TinyUrl<T>): void {
        this.apiService.post(TinyUrlService.URL_UTILITY_TINY_URL_SET, tiny_url,
            result => {
                this.clipboardService.copy(window.location.origin + "/tiny_url/" + result.toString());
                this.notificationService.propagate(Severity.Success, "TinyUrl.set_success");
            }, () => {
                this.notificationService.propagate(Severity.Error, "TinyUrl.set_failure");
            });
    }

    set_table_filter(navigation_id: number, filter: any, url_suffix?: string): void {
        if (!TinyUrlService.NAVIGATION_META.has(navigation_id)) {
            this.notificationService.propagate(Severity.Error, "TinyUrl.set_failure");
            return;
        }

        const tiny_url = {
            type_id: 1,
            navigation_id,
            url_suffix,
            payload: {
                page: 0,
                columns: []
            } as TableUrl
        } as TinyUrl<TableUrl>;
        for (const key in filter) {
            if (key === "page") {
                tiny_url.payload.page = filter[key];
            } else {
                tiny_url.payload.columns.push({
                    filter_name: key,
                    filter: [filter[key].filter, filter[key].sorting]
                });
            }
        }
        this.set_tiny_url(tiny_url);
    }

    private process_tiny_url(tiny_url_dto: TinyUrlDto): void {
        const payload = JSON.parse(tiny_url_dto.url_payload);
        if (!TinyUrlService.NAVIGATION_META.has(payload.navigation_id)) {
            this.failure$.next();
            return;
        }

        if (payload.type_id === 1) {
            const table_tiny_url = payload as TinyUrl<TableUrl>;
            const new_filter = {page: table_tiny_url.payload.page};
            for (const column of table_tiny_url.payload.columns)
                new_filter[column.filter_name] = {filter: column.filter[0], sorting: column.filter[1]};
            this.settingsService.set(TinyUrlService.NAVIGATION_META.get(table_tiny_url.navigation_id)[1], new_filter);
            this.redirect_url$.next(TinyUrlService.NAVIGATION_META.get(table_tiny_url.navigation_id)[0].replace(":url_suffix", table_tiny_url.url_suffix));
        } else if (payload.type_id === 2) {
            const table_tiny_url = payload as TinyUrl<RankingUrl>;
            this.settingsService.set(TinyUrlService.NAVIGATION_META.get(table_tiny_url.navigation_id)[1], table_tiny_url.payload);
            this.redirect_url$.next(TinyUrlService.NAVIGATION_META.get(table_tiny_url.navigation_id)[0]);
        } else if (payload.type_id === 3) {
            const table_tiny_url = payload as TinyUrl<any>;
            this.settingsService.set(TinyUrlService.NAVIGATION_META.get(table_tiny_url.navigation_id)[1].replace(":instance_meta_id", table_tiny_url.payload.instance_meta_id),
                table_tiny_url.payload);
            this.redirect_url$.next(TinyUrlService.NAVIGATION_META.get(table_tiny_url.navigation_id)[0].replace(":url_suffix", table_tiny_url.url_suffix));
        } else {
            this.failure$.next();
        }
    }
}
