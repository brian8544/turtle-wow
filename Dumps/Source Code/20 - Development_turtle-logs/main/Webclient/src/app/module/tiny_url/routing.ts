import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {TinyUrlComponent} from "./component/tiny_url/tiny_url";

const routes: Routes = [
    {path: "", component: TinyUrlComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TinyUrlRouting {
}
