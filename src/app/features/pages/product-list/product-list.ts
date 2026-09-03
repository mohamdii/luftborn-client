import { Component, signal } from '@angular/core';
import { ProductDto } from '../../../core/models/product.model';
import { Product } from '../../../core/services/product.service';

@Component({
  imports: [],
  selector: 'app-product-list',
  styleUrl: './product-list.css',
  templateUrl: './product-list.html',
})
export class ProductList {
  products = signal<ProductDto[]>([]);
  loading = signal<boolean>(true) ;
  errorMessage = signal<string | null>(null);

  constructor(private productService: Product) { }

  ngOnInit() {
    this.productService.getAll().subscribe({
      next: (products) => {
        this.products.set(products);
        this.loading.set(false);
      },
      error: (error) => {
        this.errorMessage.set('Failed to load products. Please try again later.');
        this.loading.set(false);
      }
    });

  }

}
