import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {CommonModule} from "@angular/common";
import {NotificationList} from "./component/notification_list/notification_list";
import {NotificationComponent} from "./component/notification/notification";

@NgModule({
    declarations: [
        NotificationList,
        NotificationComponent
    ],
    imports: [
        CommonModule,
        TranslateModule
    ],
    exports: [NotificationList]
})
export class NotificationListModule {
}
