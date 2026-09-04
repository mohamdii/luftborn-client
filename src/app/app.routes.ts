import { Routes } from '@angular/router';
import { ProductList } from './features/pages/product-list/product-list';
import { ProductForm } from './features/products/pages/product-form/product-form';

export const routes: Routes = [
  {
    path: 'products',
    children: [
      {
        path: '',
        component: ProductList,
      },
      {
        path: ':id',
        component: ProductForm,
      },
    ],
  },
];
