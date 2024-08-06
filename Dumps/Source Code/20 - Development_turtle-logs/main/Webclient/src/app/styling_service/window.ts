import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable({
    providedIn: "root",
})
export class WindowService {

    public screenWidth$: BehaviorSubject<number> = new BehaviorSubject(0);
    public screenHeight$: BehaviorSubject<number> = new BehaviorSubject(0);

    constructor() {
        this.onResize();
        window.addEventListener('resize', () => this.onResize());
    }

    private onResize(): void {
        this.screenHeight$.next(window.innerHeight);
        this.screenWidth$.next(window.innerWidth);
    }

}
