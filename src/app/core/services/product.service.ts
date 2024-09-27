import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {

  private http = inject(HttpClient);

  async loadUserData(id: number): Promise<any> {
    const response = this.http.get(`https://rickandmortyapi.com/api/character/${id}`);
    const data = firstValueFrom(response);
    return data;
  }

  async loadProducts(): Promise<any> {
    const response = this.http.get('https://rickandmortyapi.com/api/character');
    const data = firstValueFrom(response);
    return data;
  }

  loadUserDataObs(id: number) {
    return this.http.get(`https://rickandmortyapi.com/api/character/${id}`);
  }

  loadProductsObs() {
    return this.http.get('https://rickandmortyapi.com/api/character');
  }
}