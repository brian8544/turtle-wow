import {NgModule} from "@angular/core";
import {CharacterTooltipComponent} from "./component/character_tooltip/character_tooltip";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    declarations: [CharacterTooltipComponent],
    imports: [CommonModule, TranslateModule],
    exports: [CharacterTooltipComponent]
})
export class CharacterTooltipModule {
}
