import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
        map((event: any) => {
      if (event?.body?.statusCode === 333 || event?.body?.message === 'Unauthorized') {
        console.error('Session expired - redirecting to login.');
        localStorage.clear()
        router.navigate(['/Auth/select']);
        throw event.body; // simulate an error
      }
      return event;
    }),
    catchError((error) => {
      if (error.status === 333) {
        console.error('Session expired - redirecting to login.');
        router.navigate(['/Auth']);
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
