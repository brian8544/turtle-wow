import {Component, EventEmitter, Input, Output} from "@angular/core";
import {TableComponent} from "../../../../component/table/table";

@Component({
    selector: "TableFooter",
    templateUrl: "./table_footer.html",
    styleUrls: ["./table_footer.scss"]
})
export class TableFooterComponent {

    @Input() numItems: number;
    @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>();

    getNumPages(): number {
        return Math.ceil(this.numItems / TableComponent.PAGE_SIZE);
    }

    bubblePageChanged(pageNumber: number) {
        this.pageChanged.emit(pageNumber);
    }
}
