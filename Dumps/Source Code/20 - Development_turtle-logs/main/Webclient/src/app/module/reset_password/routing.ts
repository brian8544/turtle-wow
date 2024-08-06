import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ResetPasswordComponent} from "./component/reset_password/reset_password";

const routes: Routes = [
    {path: "", component: ResetPasswordComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ResetPasswordRouting {
}
