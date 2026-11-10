import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from '../../shared/models/product';
import { RestaurantService } from '../../shared/services/restaurant-service';

@Component({
  selector: 'app-products',
  imports: [RouterLink],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {
  private service = inject(RestaurantService);
  private route = inject(ActivatedRoute);

  readonly take = 8;

  page = signal(1);
  products = signal<Product[]>([]);
  loading = signal(true);
  error = signal('');

  constructor() {
    // Runs on load and every time ?page= changes
    this.route.queryParamMap.pipe(takeUntilDestroyed()).subscribe((params) => {
      const page = Math.max(1, Number(params.get('page')) || 1);
      this.page.set(page);
      this.load(page);
    });
  }

  private load(page: number) {
    this.loading.set(true);
    this.error.set('');

    this.service.getProducts(this.take, page).subscribe({
      next: (res) => {
        this.products.set(res.data.products);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Could not load products');
        this.loading.set(false);
      },
    });
  }
}
