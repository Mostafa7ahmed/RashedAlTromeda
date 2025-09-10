import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 333) {
        console.error('Session expired - redirecting to login.');
        router.navigate(['/login']);
        return throwError(() => error);
      }

      if (error.status === 401) {
        console.error('Unauthorized - Please log in.');
      } else if (error.status === 403) {
        console.error('Forbidden - You do not have permission.');
      } else if (error.status === 404) {
        console.error('Not Found - The requested resource was not found.');
      } else if (error.status >= 500) {
        console.error('Server Error - Please try again later.');
      } else if (error.status === 0) {
        console.error('Network error - Check your connection.');
      }

      return throwError(() => error);
    })
  );
};
