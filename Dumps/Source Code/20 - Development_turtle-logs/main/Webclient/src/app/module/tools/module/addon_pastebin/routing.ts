import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AddonPastebinComponent} from "./component/addon_pastebin/addon_pastebin";

const routes: Routes = [{
    path: "", component: AddonPastebinComponent, children: [
        {path: "", redirectTo: "search", pathMatch: "full" },
        {
            path: "search",
            loadChildren: () => import("./module/search/module").then(m => m.SearchModule)
        },
        {
            path: "viewer/:id",
            loadChildren: () => import("./module/viewer/module").then(m => m.ViewerModule)
        },
        {
            path: "edit",
            loadChildren: () => import("./module/edit/module").then(m => m.EditModule)
        },
        {
            path: "edit/:id",
            loadChildren: () => import("./module/edit/module").then(m => m.EditModule)
        },
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AddonPastebinRouting {
}
