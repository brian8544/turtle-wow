import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {UploadsComponent} from "./component/uploads/uploads";

const routes: Routes = [
    {path: "", component: UploadsComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UploadsRouting {
}
