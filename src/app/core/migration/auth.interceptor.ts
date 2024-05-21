import {
  HttpInterceptorFn,
  HttpResponse,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpEventType,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { tap, catchError, switchMap, throwError, of } from 'rxjs';
import { UsersService } from '../services/users/users.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const userService = inject(UsersService);
  const token = localStorage.getItem('access_token') ?? '';
  req = req.clone({
    setHeaders: {
      Authorization: token ? `Bearer ${token}` : '',
    },
    withCredentials: true,
  });

  return next(req).pipe(
    tap({
      next: (event) => {
        if (event.type === HttpEventType.Response) {
          console.log(req.url);
        }
      },
    }),
    catchError((err) => {
      const { success, message } = err.error;
      if (!success && message === 'Unauthorization') {
        return userService.refresh().pipe(
          switchMap((data: any) => {
            localStorage.setItem('access_token', data?.accessToken);

            const newReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${data.accessToken}`,
              },
            });

            return next(newReq);
          }),
          catchError((refreshError) => {
            console.error('Refresh token failed', refreshError);
            return throwError(() => refreshError);
          })
        );
      }
      return throwError(() => err);
    })
  );
};
