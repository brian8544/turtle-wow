import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {ArmoryComponent} from "./component/armory/armory";
import {CommonModule} from "@angular/common";
import {ArmoryRouting} from "./routing";
import {CharacterViewerService} from "./module/character_viewer/service/character_viewer";

@NgModule({
    declarations: [ArmoryComponent],
    imports: [
        CommonModule,
        TranslateModule,
        ArmoryRouting
    ],
    exports: [ArmoryComponent],
    providers: [CharacterViewerService]
})
export class ArmoryModule {
}
