import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, NewsService } from '@core/services';
import { catchError, throwError } from 'rxjs';

export const tokenRefresherInterceptor: HttpInterceptorFn = (req, next) => {
    const _router = inject(Router);
    const _auth = inject(AuthService);
    const _news = inject(NewsService);
    return next(req).pipe(
        catchError((err) => {
            if(err.status===400)
            {
                console.log(err);
                console.log(err.error.message);
                _auth.setAuthError(err.error.message);
                //_news.setNewsError(err.error.message);
            }
            else if (err.status===401)
            {
                console.log(401);
                
                _auth.logout();
                _router.navigate(["/", "login"]);
            }
            else if (err.status===403)
            {
                console.log(403);
                
                _router.navigate(["/", "error", "404"]);
            }
            return throwError(() => new Error(err.error.message));
        }
    ));
};
