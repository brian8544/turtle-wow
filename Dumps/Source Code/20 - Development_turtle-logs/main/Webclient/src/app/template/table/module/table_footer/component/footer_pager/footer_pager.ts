import {Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
    selector: "FooterPager",
    templateUrl: "./footer_pager.html",
    styleUrls: ["./footer_pager.scss"]
})
export class FooterPagerComponent {

    numPagesData: number;
    currentPage: number = 1;

    @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>();
    @Input()
    set numPages(page: number) {
        this.numPagesData = page;
        if (this.currentPage > page)
            this.currentPage = 1;
    }
    get numPages(): number {
        return this.numPagesData;
    }

    goToFirstPage(): void {
        this.currentPage = 1;
        this.pageChanged.emit(this.currentPage);
    }

    goToLastPage(): void {
        this.currentPage = this.numPages;
        this.pageChanged.emit(this.currentPage);
    }

    goToNextPage(): void {
        if (this.currentPage + 1 <= this.numPages) {
            ++this.currentPage;
            this.pageChanged.emit(this.currentPage);
        }
    }

    goToPreviousPage(): void {
        if (this.currentPage - 1 >= 1) {
            --this.currentPage;
            this.pageChanged.emit(this.currentPage);
        }
    }
}
