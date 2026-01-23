import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: "my-profile",
        loadComponent: () => import("./my-profile-page/my-profile-page").then(y => y.MyProfilePage),
    },
];