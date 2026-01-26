import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { AuthService } from '@core/services/auth-service';

export const isModeratorOrAdminGuard: CanActivateChildFn = (childRoute, state) => {
    const auth = inject(AuthService);
    const router = inject(Router);

    if (auth.role()==="admin"||auth.role()==="moderator")
    {
        return true;
    }
    router.navigate(["/"]); //  Later, we'll route towards a 'forbidden' page
    return false;
};
