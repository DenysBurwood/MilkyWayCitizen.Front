import { Routes } from '@angular/router';
import { isConnectedGuard } from '@core/guard/is-connected-guard';
import { isNotConnectedGuard } from '@core/guard/is-not-connected-guard';

export const routes: Routes = [
    {
        path: "",
        loadComponent: () => import("./features/homePage/home-page/home-page").then(y => y.HomePage),
    },
    {
        path: "login",
        canActivate: [isNotConnectedGuard],
        loadComponent: () => import("./features/auth/login-page/login-page").then(y => y.LoginPage),
    },
    {
        path: "register",
        canActivate: [isNotConnectedGuard],
        loadComponent: () => import("./features/auth/register-page/register-page").then(y => y.RegisterPage),
    },
    {
        path: "news",
        loadChildren: () => import('./features/news/news.routes').then(w => w.routes),
    },
    {
        path: "user",
        canActivateChild:[isConnectedGuard],
        loadChildren: () => import('./features/user/user.routes').then(w => w.routes),
    },
    {
        path:"error",
        loadChildren: () => import("./features/error/error.routes").then(w => w.routes),
    },
    {
        path:"**",
        redirectTo: "error/404",
    }
];
