import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {ExportViewerComponent} from "./component/export_viewer/export_viewer";
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [ExportViewerComponent],
    imports: [
        CommonModule,
        TranslateModule
    ],
    exports: [ExportViewerComponent]
})
export class ExportViewerModule {
}
