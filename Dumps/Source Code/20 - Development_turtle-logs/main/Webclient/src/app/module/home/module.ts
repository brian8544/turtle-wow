import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {CommonModule} from "@angular/common";
import {HomeComponent} from "./component/home/home";
import {HomeRouting} from "./routing";

@NgModule({
    declarations: [HomeComponent],
    imports: [
        CommonModule,
        TranslateModule,
        HomeRouting,
    ],
    exports: [HomeComponent]
})
export class HomeModule {
}
