import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {HeaderColumn} from "../../domain_value/header_column";
import {table_init_filter} from "../../../../utility/table_init_filter";

@Component({
    selector: "HeaderRow",
    templateUrl: "./header_row.html",
    styleUrls: ["./header_row.scss"]
})
export class HeaderRowComponent implements OnInit {

    @Input() columns: Array<HeaderColumn>;
    @Input() filter: any;
    @Output() filterChanged: EventEmitter<string> = new EventEmitter<string>();

    currentFilter: object = {};

    ngOnInit(): void {
        if (this.filter) {
            this.currentFilter = this.filter;
        } else {
            this.currentFilter = table_init_filter(this.columns);
        }
    }

    emitFilter(column: any, filter: any): void {
        if (this.currentFilter[column.filter_name].filter !== filter) {
            this.currentFilter[column.filter_name].filter = filter;
            this.filterChanged.emit(JSON.stringify(this.currentFilter));
        }
    }

    emitSort(column: any, state: number | null): void {
        const newStateValue = state === null ? null : state === 1;
        if (this.currentFilter[column.filter_name].sorting !== newStateValue) {
            this.currentFilter[column.filter_name].sorting = newStateValue;
            this.filterChanged.emit(JSON.stringify(this.currentFilter));
        }
    }
}
