import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ConfirmComponent} from "./component/confirm/confirm";

const routes: Routes = [
    {path: "", component: ConfirmComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ConfirmRouting {
}
