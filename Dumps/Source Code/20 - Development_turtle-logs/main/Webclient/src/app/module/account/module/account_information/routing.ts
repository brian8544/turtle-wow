import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AccountInformationComponent} from "./component/account_information/account_information";

const routes: Routes = [
    {path: "", component: AccountInformationComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountInformationRouting {
}
