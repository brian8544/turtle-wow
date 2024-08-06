import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterLoadingBarComponent} from "./component/router_loading_bar/router_loading_bar";

@NgModule({
    declarations: [RouterLoadingBarComponent],
    imports: [CommonModule],
    exports: [RouterLoadingBarComponent]
})
export class RouterLoadingBarModule {
}
