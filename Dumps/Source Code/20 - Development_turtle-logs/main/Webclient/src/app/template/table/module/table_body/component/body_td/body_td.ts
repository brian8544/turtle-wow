import {Component, Input, TemplateRef} from "@angular/core";
import {BodyColumn} from "../../domain_value/body_column";
import {DateService} from "../../../../../../service/date";

@Component({
    selector: "BodyTd",
    templateUrl: "./body_td.html",
    styleUrls: ["./body_td.scss"]
})
export class BodyTdComponent {
    @Input() specification: BodyColumn;
    @Input() typeRange: Map<number, string>;
    @Input() et_item: TemplateRef<any>;

    constructor(
        private dateService: DateService
    ) {}

    bodyContentToString(): string {
        if (this.specification.content.length === 0)
            return "-";

        if (this.specification.type === 2)
            return this.dateService.toRPLLShortDate(Number(this.specification.content) * 1000);
        if (this.specification.type === 3 && this.typeRange.has(Number(this.specification.content)))
            return this.typeRange.get(Number(this.specification.content));
        return this.specification.content;
    }
}
