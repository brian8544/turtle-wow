import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LogOutGuard} from "./guard/logout";
import {AuthenticateGuard} from "./guard/authenticate";
import {SignedInGuard} from "./guard/signed_in";

const routes: Routes = [
    {path: "", loadChildren: () => import("./module/home/module").then(m => m.HomeModule)},
    {
        path: "account",
        loadChildren: () => import("./module/account/module").then(m => m.AccountModule),
        canLoad: [AuthenticateGuard]
    },
    {
        path: "login",
        loadChildren: () => import("./module/login/module").then(m => m.LoginModule),
        canLoad: [SignedInGuard]
    },
    {path: "logout", children: [], canActivate: [LogOutGuard]},
    {
        path: "sign_up",
        loadChildren: () => import("./module/sign_up/module").then(m => m.SignUpModule),
        canLoad: [SignedInGuard]
    },
    {
        path: "reset_password",
        loadChildren: () => import("./module/reset_password/module").then(m => m.ResetPasswordModule),
        canLoad: [SignedInGuard]
    },
    {
        path: "confirm/:type/:confirm_id",
        loadChildren: () => import("./module/confirm/module").then(m => m.ConfirmModule),
    },
    {path: "armory", loadChildren: () => import("./module/armory/module").then(m => m.ArmoryModule)},
    {path: "tools", loadChildren: () => import("./module/tools/module").then(m => m.ToolsModule)},
    {path: "pve", loadChildren: () => import("./module/pve/module").then(m => m.PveModule)},
    {path: "pvp", loadChildren: () => import("./module/pvp/module").then(m => m.PvpModule)},
    {path: "404", loadChildren: () => import("./module/404/module").then(m => m.FourOFourModule)},
    {path: "contribute", loadChildren: () => import("./module/contribute/module").then(m => m.ContributeModule)},
    {path: "viewer", loadChildren: () => import("./module/viewer/module").then(m => m.ViewerModule)},
    {path: "tiny_url/:link", loadChildren: () => import("./module/tiny_url/module").then(m => m.TinyUrlModule)},
    {path: "playground", loadChildren: () => import("./module/playground/module").then(m => m.PlaygroundModule)},
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})
export class AppRouting {
}
