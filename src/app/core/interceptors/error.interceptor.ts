import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  return next(req).pipe(
    catchError((error) => {
      switch (error.status) {
        case 404:
          router.navigate(['/not-found']);
          break;
        case 401:
          console.error('Unauthorized — session may have expired.');
          break;
        case 403:
          console.error('Forbidden — you do not have access to this resource.');
          break;
        default:
          console.error('Unexpected error:', error);
      }

      return throwError(() => error);
    }),
  );
};