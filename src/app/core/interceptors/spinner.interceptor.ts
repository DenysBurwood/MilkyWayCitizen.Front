import { HttpContextToken, HttpHandler, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { SpinnerService } from '@core/utils/spinner.utils';
import { finalize } from 'rxjs';

export const SkipLoading = 
  new HttpContextToken<boolean>(() => false);

export const spinnerInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
    const _spinner = inject(SpinnerService);
    if (req.context.get(SkipLoading))
    {
        return next(req)
    }
    _spinner.loadingOn();
    return next(req).pipe(
        finalize(
            () => {
            _spinner.loadingOff();
        })
    );
};
