import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {RankingComponent} from "./component/ranking/ranking";

const routes: Routes = [
    {path: "", component: RankingComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RankingRouting {
}
