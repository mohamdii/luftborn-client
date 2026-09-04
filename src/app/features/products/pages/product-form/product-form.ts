import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../../core/services/product.service';
@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-product-form',
  styleUrl: './product-form.css',
  templateUrl: './product-form.html',
})
export class ProductForm implements OnInit {
  form: FormGroup;
  submitting: boolean = false;
  errorMessage: string | null = null;
  isEditMode: boolean = false;
  productId: number | null = null;
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.form = this.fb.group({
      name: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      price: new FormControl(0, [Validators.required, Validators.min(0)]),
      stockQuantity: new FormControl(0, [Validators.required, Validators.min(0)]),
    });
  }

  ngOnInit() {
    const paramId = this.route.snapshot.paramMap.get('id');
    if (paramId) {
      this.isEditMode = true;
      this.productId = Number(paramId);

      this.productService.getById(this.productId).subscribe({
        next: (product) => {
          if (product) {
            this.form.patchValue(product);
          }
        },
        error: (error) => {
          console.error('Error fetching product:', error);
        },
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting = true;
    const productData = this.form.value;

    const request$ =
      this.isEditMode && this.productId
        ? this.productService.update(this.productId, productData)
        : this.productService.create(productData);

    request$.subscribe({
      next: () => {
        this.router.navigate(['/products']);
      },
      error: (error) => {
        console.error('Error saving product:', error);
        this.errorMessage = 'An error occurred while saving the product.';
        this.submitting = false;
      },
    });
  }
}
