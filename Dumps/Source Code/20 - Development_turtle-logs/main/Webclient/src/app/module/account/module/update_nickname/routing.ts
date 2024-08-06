import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {UpdateNicknameComponent} from "./component/update_nickname/update_nickname";

const routes: Routes = [
    {path: "", component: UpdateNicknameComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UpdateNicknameRouting {
}
