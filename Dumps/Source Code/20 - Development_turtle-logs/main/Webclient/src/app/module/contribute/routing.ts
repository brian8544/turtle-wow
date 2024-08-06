import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ContributeComponent} from "./component/contribute/contribute";

const routes: Routes = [
    {
        path: "", component: ContributeComponent, children: [
            { path: "", loadChildren: () => import("./module/contribute/module").then(m => m.ContributeModule) },
            { path: "upload", loadChildren: () => import("./module/upload/module").then(m => m.UploadModule) }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ContributeRouting {
}
