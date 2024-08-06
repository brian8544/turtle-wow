import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {UpdatePasswordComponent} from "./component/update_password/update_password";

const routes: Routes = [
    {path: "", component: UpdatePasswordComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UpdatePasswordRouting {
}
