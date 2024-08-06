import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ArenaComponent} from "./component/arena/arena";

const routes: Routes = [
    {path: "", component: ArenaComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ArenaRouting {
}
