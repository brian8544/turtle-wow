import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {BattlegroundComponent} from "./component/battleground/battleground";

const routes: Routes = [
    {path: "", component: BattlegroundComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BattlegroundRouting {
}
