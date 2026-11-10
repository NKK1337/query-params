import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ApiResponse } from '../models/api-response';
import { ProductDetails, ProductsData } from '../models/product';

@Injectable({ providedIn: 'root' })
export class RestaurantService {
  public http = inject(HttpClient);
  private baseUrl = 'https://restaurantapi.stepacademy.ge/api';

  getProducts(take: number, page: number) {
    return this.http.get<ApiResponse<ProductsData>>(
      `${this.baseUrl}/products?Take=${take}&Page=${page}`,
    );
  }

  getProduct(id: number) {
    // Swagger shows the product directly (not wrapped in { data }),
    // but this also works if the API wraps it like the list does.
    return this.http
      .get<ProductDetails | ApiResponse<ProductDetails>>(`${this.baseUrl}/products/${id}`)
      .pipe(map((res) => ('data' in res ? res.data : res)));
  }
}
