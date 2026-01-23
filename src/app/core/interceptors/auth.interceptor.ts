import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@core/services/auth-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const _auth = inject(AuthService);
    const token = _auth.token();
    if (token)
    {

        const cloneReq = req.clone(
        {
            headers: req.headers.append('Authorization', `Bearer ${token}`),
        });
        return next(cloneReq);
    }
    return next(req);
};
