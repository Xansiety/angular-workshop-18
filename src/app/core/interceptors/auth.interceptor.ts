import { HTTP_INTERCEPTORS, HttpErrorResponse, HttpInterceptorFn, provideHttpClient, withFetch, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { LoggingInterceptorDI } from './logging.interceptor';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      //... handle error based on the status code
      return throwError(() => error);
    })
  );
};


export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withFetch(),
      // for functional interceptors
      withInterceptors([authInterceptor]),
      // for class-based interceptors
      withInterceptorsFromDi(),
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggingInterceptorDI,
      multi: true,
    }
  ]
};