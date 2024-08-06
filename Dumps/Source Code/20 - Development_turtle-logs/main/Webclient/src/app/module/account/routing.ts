import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AccountComponent} from "./component/account/account";

const routes: Routes = [
    {
        path: "", component: AccountComponent, children: [
            {
                path: "",
                loadChildren: () => import("./module/account_information/module").then(m => m.AccountInformationModule)
            },
            {
                path: "uploads",
                loadChildren: () => import("./module/uploads/module").then(m => m.UploadsModule)
            },
            {
                path: "nickname",
                loadChildren: () => import("./module/update_nickname/module").then(m => m.UpdateNicknameModule)
            },
            {
                path: "password",
                loadChildren: () => import("./module/update_password/module").then(m => m.UpdatePasswordModule)
            },
            {path: "mail", loadChildren: () => import("./module/update_mail/module").then(m => m.UpdateMailModule)},
            {path: "api", loadChildren: () => import("./module/api_tokens/module").then(m => m.APITokensModule)},
            {
                path: "delete",
                loadChildren: () => import("./module/delete_account/module").then(m => m.DeleteAccountModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountRouting {
}
