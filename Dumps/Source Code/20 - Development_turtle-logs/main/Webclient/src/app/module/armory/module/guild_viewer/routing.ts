import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {GuildViewerComponent} from "./component/guild_viewer/guild_viewer";

const routes: Routes = [
    {path: "", component: GuildViewerComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GuildViewerRouting {
}
