import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";

const routes: Routes = [
    {
        path: "",
        redirectTo: "dashboard",
        pathMatch: "full"
    },
    {
        path: "dashboard",
        component: DashboardComponent
    },
    {
        path: "applications",
        loadChildren: () => import('./applications/applications.module').then(m => m.ApplicationsModule)
    },
    {
        path: "users",
        loadChildren: () => import("./users/users.module").then(m => m.UsersModule)
    },
    {
        path: "admin",
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class PagesRoutingModule { }