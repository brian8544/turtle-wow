import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {UpdateMailComponent} from "./component/update_mail/update_mail";

const routes: Routes = [
    {path: "", component: UpdateMailComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UpdateMailRouting {
}
