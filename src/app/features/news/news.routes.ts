import { Routes } from '@angular/router';
import { isModeratorOrAdminGuard } from '@core/guard/is-moderator-or-admin-guard';

export const routes: Routes = [
    {
        path: "",
        loadComponent: () => import('./news-index-page/news-index-page').then(y => y.NewsIndexPage),
    },
    {
        path: "create",
        canActivate: [isModeratorOrAdminGuard],
        loadComponent: () => import("./news-create-page/news-create-page").then(y => y.NewsCreatePage),
    },
    {
        path: "details/:id",
        loadComponent: () => import("./news-details-page/news-details-page").then(y => y.NewsDetailsPage),
    },
];