import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {SpeedRunComponent} from "./component/speed_run/speed_run";

const routes: Routes = [
    {path: "", component: SpeedRunComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SpeedRunRouting {
}
