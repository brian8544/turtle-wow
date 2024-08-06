import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {PlaygroundComponent} from "./component/playground/playground";
import {CommonModule} from "@angular/common";
import {PlaygroundRouting} from "./routing";

@NgModule({
    declarations: [PlaygroundComponent],
    imports: [
        CommonModule,
        TranslateModule,
        PlaygroundRouting
    ],
    exports: [PlaygroundComponent]
})
export class PlaygroundModule {
}
