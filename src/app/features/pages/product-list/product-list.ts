import { Component, signal } from '@angular/core';
import { ProductDto } from '../../../core/models/product.model';
import { ProductService } from '../../../core/services/product.service';
import { CurrencyPipe } from '@angular/common';
@Component({
  imports: [CurrencyPipe],
  selector: 'app-product-list',
  styleUrl: './product-list.css',
  templateUrl: './product-list.html',
})
export class ProductList {
  products = signal<ProductDto[]>([]);
  loading = signal<boolean>(true);
  errorMessage = signal<string | null>(null);

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getAll().subscribe({
      next: (products) => {
        this.products.set(products);
        this.loading.set(false);
      },
      error: (error) => {
        this.errorMessage.set('Failed to load products. Please try again later.');
        this.loading.set(false);
      },
    });
  }
}
