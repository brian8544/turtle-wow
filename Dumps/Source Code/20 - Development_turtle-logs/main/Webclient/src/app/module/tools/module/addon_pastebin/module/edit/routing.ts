import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {EditComponent} from "./component/edit/edit";

const routes: Routes = [{path: "", component: EditComponent}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EditRouting {
}
