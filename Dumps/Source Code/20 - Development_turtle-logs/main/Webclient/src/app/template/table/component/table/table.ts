import {Component, EventEmitter, Input, OnChanges, Output, TemplateRef} from "@angular/core";
import {WindowService} from "../../../../styling_service/window";
import {BodyColumn} from "../../module/table_body/domain_value/body_column";
import {HeaderColumn} from "../../module/table_header/domain_value/header_column";
import {BodyRow} from "../../module/table_body/domain_value/body_row";
import {table_init_filter} from "../../utility/table_init_filter";
import {SettingsService} from "src/app/service/settings";

@Component({
    selector: "Table",
    templateUrl: "./table.html",
    styleUrls: ["./table.scss"]
})
export class TableComponent implements OnChanges {

    static readonly PAGE_SIZE: number = 10;

    @Output() filterOrPageChanged: EventEmitter<object> = new EventEmitter<object>();
    @Output() share: EventEmitter<any> = new EventEmitter();

    @Input() responsiveHeadColumns: Array<number> = [0, 2];
    @Input() responsiveModeWidthInPx: number = 500;
    @Input() enableHeader: boolean = true;
    @Input() enableFooter: boolean = true;
    @Input() enableShare: boolean = true;
    @Input() clientSide: boolean = true;
    @Input() headColumns: Array<HeaderColumn> = [];
    @Input() numItems: number = 0;
    @Input() et_row_items: Array<TemplateRef<any>>;
    @Input() unique_id: string = '1234';

    @Input()
    set bodyRows(rows: Array<BodyRow>) {
        this.bodyRowsData = rows;
        this.setCurrentPageRows();
    }

    get bodyRows(): Array<BodyRow> {
        return this.bodyRowsData;
    }

    bodyRowsData: Array<BodyRow> = [];
    currentPageRows: Array<BodyRow> = [];
    isResponsiveMode: boolean = false;

    private currentPageData: number = 0;
    currentFilter: any;

    isMinimized: boolean = false;

    constructor(
        private windowService: WindowService,
        private settingsService: SettingsService
    ) {
        this.windowService.screenWidth$.subscribe((width) => this.isResponsiveMode = width <= this.responsiveModeWidthInPx);
    }

    ngOnChanges(): void {
        if (!this.currentFilter) {
            if (this.settingsService.check("table_filter_" + this.unique_id)) {
                this.currentFilter = this.settingsService.get("table_filter_" + this.unique_id);
            } else {
                this.currentFilter = table_init_filter(this.headColumns);
            }
        }
        this.isResponsiveMode = this.windowService.screenWidth$.getValue() <= this.responsiveModeWidthInPx;
    }

    set currentPage(page: number) {
        this.currentPageData = page - 1;
        if (this.clientSide)
            this.setCurrentPageRows();
        else {
            this.currentFilter.page = this.currentPageData;
            this.filterOrPageChanged.emit(this.currentFilter);
        }
    }

    get currentPage(): number {
        return this.currentPageData;
    }

    toggleMinimize(): void {
        this.isMinimized = !this.isMinimized;
    }

    emit_share(): void {
        this.share.emit(this.currentFilter);
    }

    handleFilterChanged(filter: string): void {
        const result = JSON.parse(filter);
        this.settingsService.set("table_filter_" + this.unique_id, result);
        this.currentFilter = result;
        this.currentPage = 1;
    }

    private setCurrentPageRows(): void {
        const rows = this.applyFilter();
        if (this.clientSide) {
            this.numItems = rows.length;
            this.currentPageRows = rows
                .slice(this.currentPage * TableComponent.PAGE_SIZE, (this.currentPage + 1) * TableComponent.PAGE_SIZE >= this.bodyRowsData.length ?
                    this.bodyRowsData.length : (this.currentPage + 1) * TableComponent.PAGE_SIZE);
        } else {
            this.currentPageRows = this.bodyRowsData;
        }
    }

    private applyFilter(): Array<BodyRow> {
        if (!this.clientSide)
            return this.bodyRowsData;

        return this.bodyRowsData
            .filter(row => row.columns.every((column, index) => {
                const filter = this.currentFilter[this.headColumns[index].filter_name].filter;
                return !filter || filter.toString().toLowerCase() === column.content.toString().toLowerCase() || (
                    column.type === 0 && column.content.toString().toLowerCase().includes(filter.toString().toLowerCase())
                );
            }))
            .sort((leftRow, rightRow) => {
                for (let index = 0; index < leftRow.columns.length; ++index) {
                    const filterSorting = this.currentFilter[this.headColumns[index].filter_name].sorting;
                    if (filterSorting === null)
                        continue;

                    const leftColumn: BodyColumn = leftRow.columns[index];
                    const rightColumn: BodyColumn = rightRow.columns[index];
                    const sorting: number = filterSorting === true ? 1 : -1;

                    if (leftColumn.type === 0) {
                        const result = leftColumn.content.localeCompare(rightColumn.content);
                        if (result === 0)
                            continue;
                        return result * sorting;
                    } else {
                        const leftNum = Number(leftColumn.content);
                        const rightNum = Number(rightColumn.content);
                        if (leftNum === rightNum)
                            continue;
                        return (leftNum > rightNum ? 1 : -1) * sorting;
                    }
                }
                return 0;
            });

    }
}
