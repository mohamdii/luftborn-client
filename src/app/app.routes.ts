import { MsalGuard } from '@azure/msal-angular';
import { ProductList } from './features/pages/product-list/product-list';
import { ProductForm } from './features/products/pages/product-form/product-form';
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'products', component: ProductList, canActivate: [MsalGuard] },
  { path: 'products/new', component: ProductForm, canActivate: [MsalGuard] },
  { path: 'products/edit/:id', component: ProductForm, canActivate: [MsalGuard] },
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'not-found', loadComponent: () => import('./shared/notfound/not-found').then((m) => m.NotFound) },
  { path: '**', redirectTo: 'not-found' },
];
