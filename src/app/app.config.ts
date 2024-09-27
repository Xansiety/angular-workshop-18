import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withFetch, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { tap } from 'rxjs';
import { provideAnimations } from '@angular/platform-browser/animations';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { LoggingInterceptorDI } from './core/interceptors/logging.interceptor';


export function initializeApp(http: HttpClient) {
  return (): Promise<any> =>
    firstValueFrom(
      http.get("https://rickandmortyapi.com/api/character")
        .pipe(tap((character: any) => console.log({ character })))
    );
}

export const appConfig: ApplicationConfig = {
  providers: [
  provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes),
  provideClientHydration(
    withEventReplay(),
  ),
  provideAnimations(),
  provideHttpClient(
    withFetch(),
    withInterceptors([authInterceptor]),
    withInterceptorsFromDi(),
  ),
  { provide: 'APP_INITIALIZER', useFactory: initializeApp, deps: [HttpClient], multi: true, },
  { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptorDI, multi: true },
  { provide: 'BACKEND_URL', useValue: 'https://yourdomain.com/api' },]
};
