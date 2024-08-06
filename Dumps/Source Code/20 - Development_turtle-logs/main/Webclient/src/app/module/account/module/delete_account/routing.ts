import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {DeleteAccountComponent} from "./component/delete_account/delete_account";

const routes: Routes = [
    {path: "", component: DeleteAccountComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DeleteAccountRouting {
}
