import {Component, Input, TemplateRef} from "@angular/core";
import {BodyColumn} from "../../domain_value/body_column";

@Component({
    selector: "BodyRow",
    templateUrl: "./body_row.html",
    styleUrls: ["./body_row.scss"]
})
export class BodyRowComponent {
    @Input() columns: Array<BodyColumn>;
    @Input() typeRange: Array<Map<number, string>>;
    @Input() colTypes: Array<number>;
    @Input() et_row_items: Array<TemplateRef<any>>;
}
