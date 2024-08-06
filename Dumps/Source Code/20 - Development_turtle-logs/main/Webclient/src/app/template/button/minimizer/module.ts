import {NgModule} from "@angular/core";
import {MinimizerComponent} from "./component/minimizer/minimizer";
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [MinimizerComponent],
    imports: [CommonModule],
    exports: [MinimizerComponent]
})
export class MinimizerModule {
}
