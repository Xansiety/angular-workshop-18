import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);

  public isLogged = this.platformId === 'browser' ? localStorage.getItem('isLogged') === 'true' : false;
  constructor() { }

  public login(): Observable<{ info: any, results: any }> {
    return this.http.get<{ info: any, results: any }>('https://rickandmortyapi.com/api/character')
      .pipe(
        tap(() => {

          // Save the login status in the local storage wun on the browser
          if (this.platformId === 'browser') {
            localStorage.setItem('isLogged', 'true');
          }

        }),
        map((response) => response)
      );
  }

  public logout() {
    localStorage.removeItem('isLogged');
  }

  public get isLoggedUser() {
    return this.isLogged;
  }
}
