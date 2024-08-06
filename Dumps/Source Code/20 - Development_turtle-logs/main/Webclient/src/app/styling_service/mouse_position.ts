import {Injectable} from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class MousePositionService {

    x_pos: number = 0;
    y_pos: number = 0;

    constructor() {
        // window.addEventListener("mousemove", event => this.onMouseMove(event));
    }

    onMouseMove(event: any): void {
        this.x_pos = event.clientX;
        this.y_pos = event.clientY;
    }

}
