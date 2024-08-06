import {Component} from "@angular/core";

@Component({
    selector: "NavigationBar",
    templateUrl: "./navigation_bar.html",
    styleUrls: ["./navigation_bar.scss"]
})
export class NavigationBarComponent {
    itemsManager = [
        [ "", "NavigationBar.manager" ]
    ];

    show_item_list = false;

    toggle(): void {
        this.show_item_list = !this.show_item_list;
    }

    handleClose(): void {
        this.show_item_list = false;
    }

}
