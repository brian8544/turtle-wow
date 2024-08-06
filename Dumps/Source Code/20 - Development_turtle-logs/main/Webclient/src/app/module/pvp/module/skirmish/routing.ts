import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {SkirmishComponent} from "./component/skirmish/skirmish";

const routes: Routes = [
    {path: "", component: SkirmishComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SkirmishRouting {
}
