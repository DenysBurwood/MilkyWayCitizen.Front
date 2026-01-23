import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { AuthService } from '@core/services/auth-service';

export const isConnectedGuard: CanActivateChildFn = (childRoute, state) => 
{
    const auth = inject(AuthService);
    const router = inject(Router);

    if (auth.isConnected())
    {
        return true;
    }
    router.navigate(["/", "login"]);
    return false;
};
