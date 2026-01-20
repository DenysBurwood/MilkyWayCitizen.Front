import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: "",
        loadComponent: () => import("./features/homePage/home-page/home-page").then(y => y.HomePage),
    },
    {
        path: "login",
        loadComponent: () => import("./features/auth/login-page/login-page").then(y => y.LoginPage),
    },
    {
        path: "register",
        loadComponent: () => import("./features/auth/register-page/register-page").then(y => y.RegisterPage),
    },
];
