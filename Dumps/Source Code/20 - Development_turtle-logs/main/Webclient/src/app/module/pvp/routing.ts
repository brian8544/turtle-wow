import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {PvpComponent} from "./component/pvp/pvp";

const routes: Routes = [
    {
        path: "", component: PvpComponent, children: [
            {path: "",   redirectTo: "battleground", pathMatch: "full"},
            {path: "battleground", loadChildren: () => import("./module/battleground/module").then(m => m.BattlegroundModule)},
            {path: "arena", loadChildren: () => import("./module/arena/module").then(m => m.ArenaModule)},
            {path: "skirmish", loadChildren: () => import("./module/skirmish/module").then(m => m.SkirmishModule)},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PvpRouting {
}
