import {Component, Input} from "@angular/core";
import {DetailRow} from "../../../../domain_value/detail_row";

@Component({
    selector: "DetailRow",
    templateUrl: "./detail_row.html",
    styleUrls: ["./detail_row.scss"]
})
export class DetailRowComponent {

    show_components: boolean = false;

    @Input() detail_row: DetailRow;

    open_compenents(): void {
        if (this.detail_row.components.length === 0)
            return;
        this.show_components = !this.show_components;
    }

    format_number(number_str: number | string): string {
        return number_str.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }
}
