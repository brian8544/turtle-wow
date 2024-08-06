import {NgModule} from "@angular/core";
import {SortButtonComponent} from "./component/sort_button/sort_button";
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [SortButtonComponent],
    imports: [CommonModule],
    exports: [SortButtonComponent]
})
export class SortButtonModule {
}
