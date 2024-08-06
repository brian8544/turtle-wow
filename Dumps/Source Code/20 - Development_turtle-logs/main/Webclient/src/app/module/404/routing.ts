import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {FourOFourComponent} from "./component/404/404";

const routes: Routes = [
    {path: "", component: FourOFourComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FourOFourRouting {
}
