import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

interface Storage {
    payload: any;
    expiration: number;
}

@Injectable({
    providedIn: "root",
})
export class
SettingsService {
    private settings: Array<string> = [
        "cookieDecisions",
        "PWA_PROMPT",
        "API_TOKEN",
        "ACCOUNT_INFORMATION",
        "table_filter_armory_search",
        "table_filter_guild_viewer_member",
        "table_filter_guild_recent_raids_search",
        "table_filter_armory_raids_search",
        "table_filter_account_raids_search",
        "table_filter_raids_search",
        "table_filter_rated_arenas_search",
        "table_filter_battlegrounds_search",
        "table_filter_skirmishes_search",
        "raid_meter_viewer_rm_1",
        "raid_meter_viewer_rm_2",
        "data_service_maps",
        "data_service_servers",
        "data_service_difficulties",
        "data_service_hero_classes",
        "data_service_races",
        "data_service_npcs",
        "character_service_characters",
        "viewer_raid_graph_datasets",
        "viewer_raid_graph_events",
        "data_service_basic_items",
        "data_service_basic_spells",
        "pve_ranking",
        "data_service_encounters",
        "table_filter_viewer_ranking_table",
        "character_service_basic_characters",
        "viewer_export",
        "upload_last_server",
        "pve_speed_run",
        "pve_speed_kill",
        "table_filter_addon_search",
        "table_filter_guild_speed_kills_search",
        "table_filter_guild_speed_runs_search",
        "viewer_presets",
        "table_filter_addon_pastebin_search"
    ];

    private ignoreSettings: Array<string> = [
        "data_service_maps",
        "data_service_servers",
        "data_service_difficulties",
        "data_service_hero_classes",
        "data_service_races",
        "data_service_npcs",
        "character_service_characters",
        "character_service_basic_characters",
        "data_service_encounters",
    ];

    private observers: any = {};

    constructor() {
        const now = Date.now();
        for (let i = 0; i < localStorage.length; ++i) {
            const storageKey = localStorage.key(i);
            if (!this.settings.includes(storageKey))
                continue;

            const storage_item: Storage = JSON.parse(localStorage.getItem(storageKey));

            if (storage_item.expiration > now)
                this[storageKey] = storage_item;
        }
    }

    set(storage_key: string, value: any): void {
        this.set_with_expiration(storage_key, value, 3650);
    }

    delete(storage_key: string): void {
        this.set_with_expiration(storage_key, undefined, -1);
    }

    set_with_expiration(storage_key: string, value: any, days: number): void {
        if (!this.settings.includes(storage_key) && (!storage_key.includes(":") || !this.settings.includes(storage_key.split(":")[0])))
            throw new Error("Storage: " + storage_key + " was not predefined!");
        if (this.ignoreSettings.includes(storage_key))
            return;

        const expiration = Date.now() + days * 24 * 60 * 60 * 1000;
        const storage: Storage = {
            payload: value,
            expiration
        };
        if (value === undefined) {
            if (localStorage.getItem(storage_key) !== null)
                localStorage.removeItem(storage_key);
        } else {
            localStorage.setItem(storage_key, JSON.stringify(storage));
        }
        this[storage_key] = storage;

        // Inform observers
        if (this.observers[storage_key])
            this.observers[storage_key].forEach(callback => callback.call(callback, this[storage_key].payload));
    }

    get_or_set(storage_key: string, value: any): any {
        return this.get_or_set_with_expiration(storage_key, value, 3650);
    }

    get_or_set_with_expiration(storage_key: string, value: any, days: number): any {
        if (this.check(storage_key))
            return this.get(storage_key);
        this.set_with_expiration(storage_key, value, days);
        return value;
    }

    get(storage_key: string): any {
        return this[storage_key]?.payload;
    }

    check(storage_key: string): boolean {
        return !!this[storage_key] && !!this[storage_key].payload;
    }

    subscribe(storage_key: string, callback: any): void {
        if (!this.observers[storage_key]) {
            this.observers[storage_key] = [];
        }
        this.observers[storage_key].push(callback);
    }

    init_or_load_behavior_subject<T>(storage_key: string, days: number, subject: BehaviorSubject<T>, init_value: T, init_function: any): BehaviorSubject<T> {
        if (!!subject)
            return subject;

        if (this.check(storage_key))
            return new BehaviorSubject<T>(this.get(storage_key));

        subject = new BehaviorSubject<T>(init_value);
        init_function(result => {
            this.set_with_expiration(storage_key, result, days);
            subject.next(result);
        });
        return subject;
    }

}
