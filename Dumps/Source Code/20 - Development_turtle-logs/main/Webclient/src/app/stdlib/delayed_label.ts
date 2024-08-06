import {Observable, Subscription} from "rxjs";

export class DelayedLabel {

    private subscription: Subscription;
    private observers: any = [];
    private prefix;
    content: string = "Unknown";

    constructor(content: Observable<string>, prefix: string = undefined) {
        if (!!prefix) {
            this.prefix = prefix;
        }

        this.subscription = content.subscribe(result => {
            this.content = result;
            if (result !== "Unknown") {
                this.notify();
                this.subscription?.unsubscribe();
            }
        });
    }

    toString(): any {
        if (!!this.prefix) {
            return this.prefix + ": " + this.content;
        }
        return this.content;
    }

    subscribe(callback: any): void {
        this.observers.push(callback);
    }

    private notify(): void {
        this.observers.forEach(callback => callback.call());
    }
}
