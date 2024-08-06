import {Component, Input} from "@angular/core";

@Component({
    selector: "NavigationBar",
    templateUrl: "./navigation_bar.html",
    styleUrls: ["./navigation_bar.scss"]
})
export class NavigationBarComponent {
    @Input() itemList: Array<Array<string>>;
    show_sub_menu = false;

    closeSubMenu(): void {
        this.show_sub_menu = false;
    }
}
