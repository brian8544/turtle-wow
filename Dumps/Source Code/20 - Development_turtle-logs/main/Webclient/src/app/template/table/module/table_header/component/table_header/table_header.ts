import {Component, EventEmitter, Input, Output} from "@angular/core";
import {HeaderColumn} from "../../domain_value/header_column";

@Component({
    selector: "TableHeader",
    templateUrl: "./table_header.html",
    styleUrls: ["./table_header.scss"]
})
export class TableHeaderComponent {

    @Input() responsiveHeadColumns: Array<number>;
    @Input() isResponsiveMode: boolean;
    @Input() columns: Array<HeaderColumn>;
    @Input() filter: any;

    @Output() filterChanged: EventEmitter<string> = new EventEmitter<string>();

    getResponsiveHeaderColumns(columns: Array<HeaderColumn>): Array<HeaderColumn> {
        return columns.filter((_, index) => this.responsiveHeadColumns.includes(index));
    }

    getResponsiveBodyColumns(columns: Array<HeaderColumn>): Array<HeaderColumn> {
        return columns.filter((_, index) => !this.responsiveHeadColumns.includes(index));
    }

    bubbleFilter(filter: string): void {
        this.filterChanged.emit(filter);
    }
}
