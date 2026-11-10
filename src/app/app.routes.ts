import { Routes } from '@angular/router';
import { Products } from './features/products/products';
import { ProductDetails } from './features/product-details/product-details';

export const routes: Routes = [
  { path: '', component: Products },
  { path: 'product', component: ProductDetails },
];
