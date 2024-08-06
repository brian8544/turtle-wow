import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {PlaygroundComponent} from "./component/playground/playground";

const routes: Routes = [
    {path: "", component: PlaygroundComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PlaygroundRouting {
}
