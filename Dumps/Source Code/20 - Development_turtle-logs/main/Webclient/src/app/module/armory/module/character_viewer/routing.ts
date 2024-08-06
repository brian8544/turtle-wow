import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {CharacterViewerComponent} from "./component/character_viewer/character_viewer";

const routes: Routes = [
    {path: "", component: CharacterViewerComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CharacterViewerRouting {
}
