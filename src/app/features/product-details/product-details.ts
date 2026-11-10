import { Location } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductDetails as ProductDetailsModel } from '../../shared/models/product';
import { RestaurantService } from '../../shared/services/restaurant-service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails {
  private service = inject(RestaurantService);
  private route = inject(ActivatedRoute);
  private location = inject(Location);

  product = signal<ProductDetailsModel | null>(null);
  loading = signal(true);
  error = signal('');

  constructor() {
    // Reads ?id= from the URL, e.g. /product?id=21
    this.route.queryParamMap.pipe(takeUntilDestroyed()).subscribe((params) => {
      const id = Number(params.get('id'));

      if (!id) {
        this.loading.set(false);
        this.error.set('Product id is missing');
        return;
      }

      this.load(id);
    });
  }

  private load(id: number) {
    this.loading.set(true);
    this.error.set('');

    this.service.getProduct(id).subscribe({
      next: (product) => {
        this.product.set(product);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Could not load this product');
        this.loading.set(false);
      },
    });
  }

  back() {
    this.location.back();
  }
}
