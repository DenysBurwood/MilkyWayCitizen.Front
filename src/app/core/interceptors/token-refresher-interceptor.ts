import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services';
import { catchError, throwError } from 'rxjs';

export const tokenRefresherInterceptor: HttpInterceptorFn = (req, next) => {
    const _router = inject(Router);
    const _auth = inject(AuthService);
    return next(req).pipe(
        catchError((err) => {
            if (err.status===401)
            {
                _auth.logout();
                _router.navigate(["/", "login"]);
            }
            if (err.status===403)
            {
                _router.navigate(["/", "error", "404"]);
            }
            return throwError(() => new Error("Erreur"));
        }
    ));
};
