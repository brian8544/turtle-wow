import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {TalentViewerComponent} from "./component/talent_viewer/talent_viewer";

const routes: Routes = [
    {path: "", component: TalentViewerComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TalentViewerRouting {
}
