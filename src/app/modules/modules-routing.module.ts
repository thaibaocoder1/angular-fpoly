import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HomeProductLatestComponent } from './home/home-product-latest/home-product-latest.component';

const routes: Routes = [
  {
    path: '',
    component: HomeProductLatestComponent,
    pathMatch: 'full',
  },
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModulesRouting {}
