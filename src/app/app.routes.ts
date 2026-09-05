import { MsalGuard } from '@azure/msal-angular';
import { ProductList } from './features/pages/product-list/product-list';
import { ProductForm } from './features/products/pages/product-form/product-form';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  },

  {
    path: 'products/new',
    component: ProductForm,
    canActivate: [MsalGuard],
  },

  {
    path: 'products/edit/:id',
    component: ProductForm,
    canActivate: [MsalGuard],
  },

  {
    path: 'products',
    component: ProductList,
    canActivate: [MsalGuard],
  },
  
  {
    path: '**',
    redirectTo: 'not-found',
  },
];
