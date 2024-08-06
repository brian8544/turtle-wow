import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {ViewerEventLogTooltipComponent} from "./component/viewer_event_log_tooltip/viewer_event_log_tooltip";
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [ViewerEventLogTooltipComponent],
    imports: [
        CommonModule,
        TranslateModule
    ],
    exports: [ViewerEventLogTooltipComponent]
})
export class ViewerEventLogTooltipModule {
}
