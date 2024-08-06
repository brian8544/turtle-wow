import {NgModule} from "@angular/core";
import {ClickOutsideDirective} from "./click_outside";

@NgModule({
    declarations: [ClickOutsideDirective],
    exports: [ClickOutsideDirective]
})
export class ClickOutsideDirectiveModule {
}
