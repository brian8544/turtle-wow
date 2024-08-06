import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HeroClassComponent} from "./component/hero_class";

@NgModule({
    declarations: [HeroClassComponent],
    imports: [CommonModule],
    exports: [HeroClassComponent]
})
export class HeroClassModule {
}
