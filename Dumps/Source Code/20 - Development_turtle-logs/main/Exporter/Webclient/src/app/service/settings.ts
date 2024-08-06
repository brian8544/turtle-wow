import {Injectable} from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class SettingsService {
    private settings: Array<string> = [
        "API_TOKEN"
    ];

    private observers: any = {};

    constructor() {
        for (let i = 0; i < localStorage.length; ++i) {
            const storageKey = localStorage.key(i);
            if (!this.settings.includes(storageKey))
                continue;

            this[storageKey] = JSON.parse(localStorage.getItem(storageKey));
        }
    }

    set(cookieName: string, value: any): void {
        if (!this.settings.includes(cookieName))
            throw new Error("Cookie: " + cookieName + " was not predefined!");

        if (value === undefined) {
            if (localStorage.getItem(cookieName) !== null)
                localStorage.removeItem(cookieName);
        } else {
            localStorage.setItem(cookieName, JSON.stringify(value));
        }
        this[cookieName] = value;

        // Inform observers
        if (this.observers[cookieName])
            this.observers[cookieName].forEach(callback => callback.call(callback, this[cookieName]));
    }

    get(cookieName: string): any {
        return this[cookieName];
    }

    check(cookieName: string): boolean {
        return !!this[cookieName];
    }

    subscribe(cookieName: string, callback: any): void {
        if (!this.observers[cookieName]) {
            this.observers[cookieName] = [];
        }
        this.observers[cookieName].push(callback);
    }

}
