import { HTTP_INTERCEPTORS, HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig, Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable()
export class LoggingInterceptorDI implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        //... handle error based on the status code
        return throwError(() => error);
      })
    );
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    //...
    provideHttpClient(
      withFetch(),
      withInterceptorsFromDi(),
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggingInterceptorDI,
      multi: true,
    }
  ]
};