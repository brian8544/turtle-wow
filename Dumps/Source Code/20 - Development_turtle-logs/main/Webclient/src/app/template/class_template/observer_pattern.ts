export class ObserverPattern {
    private observers: any = [];

    notify(on_callback: any): void {
        this.observers.forEach(callback => on_callback(callback));
    }

    subscribe(callback: any): void {
        this.observers.push(callback);
    }
}
