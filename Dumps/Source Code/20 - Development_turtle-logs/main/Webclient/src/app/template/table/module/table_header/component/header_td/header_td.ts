import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {HeaderColumn} from "../../domain_value/header_column";

@Component({
    selector: "HeaderTd",
    templateUrl: "./header_td.html",
    styleUrls: ["./header_td.scss"]
})
export class HeaderTdComponent implements OnInit {
    @Input() specification: HeaderColumn;
    @Input() initFilterValue: any;
    @Output() filterChanged: EventEmitter<any> = new EventEmitter<any>();
    @Output() sortChanged: EventEmitter<number | null> = new EventEmitter<number | null>();

    showFilter: boolean = false;
    filterValueData: any;

    ngOnInit(): void {
        if (this.initFilterValue && this.initFilterValue.filter) {
            this.filterValueData = this.initFilterValue.filter;
            this.showFilter = true;
        } else {
            this.filterValueData = this.defaultFilterValue();
        }
    }

    set filterValue(value: any) {
        this.filterValueData = value;
        if (this.specification.type === 3)
            this.filterValueData = Number(value);
        if (!this.isFilterDefault()) {
            if (this.specification.type === 2)
                this.filterChanged.emit(Math.ceil(new Date(this.filterValueData).getTime() / 1000));
            else
                this.filterChanged.emit(this.filterValueData);
        } else {
            this.filterChanged.emit(null);
        }
    }

    get filterValue(): any {
        if (this.specification.type === 3)
            this.filterValueData = Number(this.filterValueData);
        return this.filterValueData;
    }

    getSortingValue(): any {
        if (!this.initFilterValue || this.initFilterValue.sorting === null)
            return 0;
        if (this.initFilterValue.sorting)
            return 1;
        return 2;
    }

    defaultFilterValue(): any {
        if (this.specification.type === 2)
            return null;
        else if (this.specification.type === 3)
            return -1;
        else if (this.specification.type > 1)
            return 0;
        return '';
    }

    columnClicked(): void {
        this.showFilter = true;
    }

    leaveFocus(): void {
        if (this.isFilterDefault())
            this.showFilter = false;
    }

    sortStateChanged(state: number): void {
        this.sortChanged.emit(state === 0 ? null : state);
    }

    private isFilterDefault(): boolean {
        return this.filterValue === this.defaultFilterValue() || (this.specification.type === 2 && this.filterValue.getTime && !this.filterValue.getTime())
        || (this.specification.type === 1 && this.filterValue === 0);
    }

}
