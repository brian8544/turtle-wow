import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {UploadComponent} from "./component/upload/upload";

const routes: Routes = [
    {path: "", component: UploadComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UploadRouting {
}
