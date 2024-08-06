import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ContributeComponent} from "./component/contribute/contribute";

const routes: Routes = [
    {path: "", component: ContributeComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ContributeRouting {
}
