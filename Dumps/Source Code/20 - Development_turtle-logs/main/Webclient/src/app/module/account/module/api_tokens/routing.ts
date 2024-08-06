import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {APITokensComponent} from "./component/api_tokens/api_tokens";

const routes: Routes = [
    {path: "", component: APITokensComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class APITokensRouting {
}
