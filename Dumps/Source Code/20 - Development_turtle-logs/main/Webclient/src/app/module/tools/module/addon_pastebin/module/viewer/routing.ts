import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ViewerComponent} from "./component/viewer/viewer";

const routes: Routes = [{path: "", component: ViewerComponent}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ViewerRouting {
}
