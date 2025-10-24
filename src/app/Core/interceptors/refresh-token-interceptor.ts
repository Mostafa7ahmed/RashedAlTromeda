import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { LoginService } from '../service/login';
export const refreshTokenInterceptor: HttpInterceptorFn = (req, next) => {
const loginService = inject(LoginService);

  const token = loginService.getToken();
  const clonedReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(clonedReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        return loginService.refreshAccessToken().pipe(
          switchMap((res: any) => {
            const newAccessToken = res.result.accessToken;
            const newRefreshToken = res.result.refreshToken;
            loginService.saveTokens(newAccessToken, newRefreshToken);
            const newReq = req.clone({
              setHeaders: { Authorization: `Bearer ${newAccessToken}` }
            });

            return next(newReq);
          }),
          catchError(refreshError => {
            console.error('Token refresh failed', refreshError);
            loginService.logout();
            return throwError(() => refreshError);
          })
        );
      }
      return throwError(() => error);
    })
  );};
