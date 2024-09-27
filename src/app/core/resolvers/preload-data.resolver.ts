import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { ProductService } from '../services/product.service';

export const preloadDataResolver: ResolveFn<boolean> = (route) =>
{
  const productsService = inject(ProductService);
  const id = route.params['id'] || 43;
  const data: Observable<any> = forkJoin({
    userInfo: productsService.loadUserDataObs(id),
    products: productsService.loadProductsObs()
  });
  return data;
};

const route = {
  path: 'dashboard',
  resolve: { data: preloadDataResolver }
}

