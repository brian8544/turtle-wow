import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ViewerComponent} from "./component/viewer/viewer";

const routes: Routes = [
    {
        path: ":instance_meta_id/:mode", component: ViewerComponent, children: [
            {path: ":actor", component: ViewerComponent},
            {path: ":meter/:spell_id", component: ViewerComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ViewerRouting {
}
