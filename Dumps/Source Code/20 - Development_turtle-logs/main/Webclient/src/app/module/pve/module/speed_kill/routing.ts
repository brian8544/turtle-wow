import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {SpeedKillComponent} from "./component/speed_kill/speed_kill";

const routes: Routes = [
    {path: "", component: SpeedKillComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SpeedKillRouting {
}
