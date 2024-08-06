import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {HeaderColumn} from "../../domain_value/header_column";
import {table_create_empty_filter} from "../../../../utility/table_init_filter";

@Component({
    selector: "ResponsiveHeaderRow",
    templateUrl: "./responsive_header_row.html",
    styleUrls: ["./responsive_header_row.scss"]
})
export class ResponsiveHeaderRowComponent implements OnInit {

    @Input() responsiveHeaderColumns: Array<HeaderColumn>;
    @Input() responsiveBodyColumns: Array<HeaderColumn>;
    @Input() filter: any;
    @Output() filterChanged: EventEmitter<string> = new EventEmitter<string>();

    isVisible: boolean = false;
    currentFilter: object = {};

    ngOnInit(): void {
        if (this.filter) {
            this.currentFilter = this.filter;
        } else {
            this.responsiveHeaderColumns.forEach(item => this.currentFilter[item.filter_name] = table_create_empty_filter());
            this.responsiveBodyColumns.forEach(item => this.currentFilter[item.filter_name] = table_create_empty_filter());
        }
    }

    toggleVisibility(): void {
        this.isVisible = !this.isVisible;
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
