import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ArmoryComponent} from "./component/armory/armory";

const routes: Routes = [{
    path: "", component: ArmoryComponent, children: [
        {path: "", loadChildren: () => import("./module/search/module").then(m => m.SearchModule)},
        {
            path: "character/:server_name/:character_name",
            loadChildren: () => import("./module/character_viewer/module").then(m => m.CharacterViewerModule)
        },
        {
            path: "character/:server_name/:character_name/:character_history_date",
            loadChildren: () => import("./module/character_viewer/module").then(m => m.CharacterViewerModule)
        },
        {
            path: "guild/:server_name/:guild_name",
            loadChildren: () => import("./module/guild_viewer/module").then(m => m.GuildViewerModule)
        },
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ArmoryRouting {
}
